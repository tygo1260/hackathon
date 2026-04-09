import Anthropic from '@anthropic-ai/sdk';
import { getDesignKnowledgeForAnalysis } from './design-knowledge.js';

let _client: Anthropic | null = null;
function getClient(): Anthropic {
  if (!_client) {
    const key = process.env.ANTHROPIC_API_KEY;
    if (!key || key === 'your-api-key-here') {
      throw new Error('ANTHROPIC_API_KEY not set. Add it to the .env file.');
    }
    console.log(`[UISense] Using API key: ${key.substring(0, 12)}...${key.substring(key.length - 4)}`);
    _client = new Anthropic({ apiKey: key });
  }
  return _client;
}

export interface DesignChange {
  component: string;
  issue: string;
  recommendation: string;
  cssSelector: string;
  cssChanges: string;
  contentChange?: string;
  principle: string;
  source: string;
  impact: 'critical' | 'high' | 'medium' | 'low';
}

export interface AnalysisResult {
  summary: string;
  overallScoreBefore: number;
  overallScoreAfter: number;
  changes: DesignChange[];
  cssOverrides: string;
  jsOverrides?: string;
}

const MIN_CHANGES = 5;
const MIN_CSS_LENGTH = 200;
const MAX_ATTEMPTS = 2;

function isAnalysisSufficient(result: AnalysisResult): boolean {
  if (!result.changes || result.changes.length < MIN_CHANGES) return false;
  if (!result.cssOverrides || result.cssOverrides.trim().length < MIN_CSS_LENGTH) return false;
  if (result.overallScoreAfter <= result.overallScoreBefore) return false;
  const hasRealCSS = result.changes.filter(
    (c) => c.cssChanges && c.cssChanges.trim().length > 10 && c.cssSelector && c.cssSelector.trim().length > 1
  ).length >= 3;
  return hasRealCSS;
}

function buildPrompt(
  url: string,
  designKnowledge: string,
  htmlSnippet: string,
  isRetry: boolean,
  previousResult?: AnalysisResult
): string {
  const retryBlock = isRetry && previousResult
    ? `

## CRITICAL — PREVIOUS ATTEMPT WAS INSUFFICIENT
Your previous analysis only returned ${previousResult.changes.length} change(s) with ${previousResult.cssOverrides?.length ?? 0} chars of CSS. The before/after looked nearly identical. This is UNACCEPTABLE.
You MUST completely transform this website this time. Think of it as a full redesign — new colors, new spacing, rewritten headlines, restructured visual hierarchy. Be BOLD. Be DRAMATIC. The before/after must look like two completely different websites.
`
    : '';

  return `You are UISense, an elite AI design consultant that TRANSFORMS website UIs based on evidence-based design literature. You don't just tweak websites — you RENOVATE them into dramatically better versions.

${designKnowledge}

## YOUR TASK

Completely renovate the UI of the website: ${url}
${retryBlock}
You have FULL CREATIVE FREEDOM. You can and should:

### VISUAL OVERHAUL (CSS)
- Completely change the color palette to something more modern and effective
- Dramatically improve typography — new font sizes, weights, line heights, letter spacing
- Restructure spacing — add breathing room, fix cramped layouts, improve visual rhythm
- Redesign buttons and CTAs to be impossible to miss
- Add or change backgrounds, gradients, shadows, border-radius
- Fix or enhance the navigation bar
- Improve hover states, transitions, and visual feedback
- Restructure the visual hierarchy so the most important content dominates
- Change element sizing, max-widths, and proportions
- Hide elements that add clutter (use display:none !important)
- Completely restyle cards, sections, footers, headers

### CONTENT REWRITES (JavaScript)
- Rewrite headlines to be more compelling, clear, and action-oriented
- Improve button text (e.g. "Submit" → "Get Started Free", "Click here" → "Explore Plans")
- Shorten or clarify confusing body text
- Improve navigation labels for clarity
- Add or rewrite microcopy for better UX

For content changes, provide JavaScript that uses document.querySelector to find elements and change their textContent or innerHTML.

## ANALYSIS AREAS
1. Visual hierarchy — Make important elements DOMINANT
2. Typography — Modern, readable, high-contrast type system
3. Spacing & layout — Generous whitespace, clear sections, visual rhythm
4. Color & contrast — Bold, modern palette with strong CTA colors
5. Navigation — Crystal clear, well-structured
6. CTA effectiveness — Buttons that BEG to be clicked
7. Content clarity — Headlines and copy that convert
8. Consistency — Unified design language across all components

## RULES
- Be BOLD. The before/after must look dramatically different
- Use !important on ALL CSS properties to guarantee they override existing styles
- Use specific CSS selectors from the HTML structure provided
- Ground every change in a design principle from the knowledge base
- Provide AT LEAST 8 high-impact changes (aim for 10-12)
- The cssOverrides field must combine ALL CSS changes into one valid CSS string
- The jsOverrides field must combine ALL content changes into one valid JS string
- Each JS override should use try/catch so one failure doesn't block others
- The overallScoreAfter should reflect the dramatic improvement (typically 25-40 points higher)

IMPORTANT: Return ONLY valid JSON with no markdown formatting, no code blocks, no backticks. Raw JSON only.

Return this exact JSON structure:
{
  "summary": "2-3 sentence assessment of what was wrong and how you transformed it",
  "overallScoreBefore": <number 0-100>,
  "overallScoreAfter": <number 0-100>,
  "changes": [
    {
      "component": "<Name of the UI component>",
      "issue": "<What's wrong with it>",
      "recommendation": "<What you changed and why>",
      "cssSelector": "<Specific CSS selector>",
      "cssChanges": "<CSS properties applied>",
      "contentChange": "<New text content if changed, omit if no text change>",
      "principle": "<Design principle from the knowledge base>",
      "source": "<Author or book>",
      "impact": "<critical|high|medium|low>"
    }
  ],
  "cssOverrides": "<ALL CSS changes combined as a single valid CSS string with !important on every property>",
  "jsOverrides": "<ALL content changes as valid JavaScript using try/catch per change>"
}

Here is the page HTML structure:
${htmlSnippet.substring(0, 12000)}`;
}

function parseResponse(raw: string): AnalysisResult {
  let jsonStr = raw.trim();
  const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1].trim();
  }
  try {
    return JSON.parse(jsonStr) as AnalysisResult;
  } catch {
    console.error('Failed to parse Claude response:', jsonStr.substring(0, 500));
    throw new Error('Failed to parse analysis results. Claude returned invalid JSON.');
  }
}

export async function analyzeWebsite(
  screenshotBase64: string,
  htmlSnippet: string,
  url: string
): Promise<AnalysisResult> {
  const designKnowledge = getDesignKnowledgeForAnalysis();
  const client = getClient();

  let lastResult: AnalysisResult | undefined;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const isRetry = attempt > 1;
    const prompt = buildPrompt(url, designKnowledge, htmlSnippet, isRetry, lastResult);

    console.log(`[UISense] Analysis attempt ${attempt}/${MAX_ATTEMPTS}${isRetry ? ' (retry — previous was insufficient)' : ''}`);

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8192,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/png',
                data: screenshotBase64,
              },
            },
            {
              type: 'text',
              text: prompt,
            },
          ],
        },
      ],
    });

    const textContent = response.content.find((c) => c.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text response from Claude');
    }

    const result = parseResponse(textContent.text);
    const sufficient = isAnalysisSufficient(result);

    console.log(
      `[UISense] Attempt ${attempt}: ${result.changes.length} changes, ` +
      `CSS length ${result.cssOverrides?.length ?? 0}, ` +
      `score ${result.overallScoreBefore}→${result.overallScoreAfter} — ` +
      `${sufficient ? 'PASS' : 'INSUFFICIENT'}`
    );

    if (sufficient || attempt === MAX_ATTEMPTS) {
      if (!sufficient) {
        console.log('[UISense] WARNING: returning best-effort result after all retries');
      }
      return result;
    }

    lastResult = result;
  }

  throw new Error('Analysis failed after all retries');
}
