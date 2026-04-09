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
}

export async function analyzeWebsite(
  screenshotBase64: string,
  htmlSnippet: string,
  url: string
): Promise<AnalysisResult> {
  const designKnowledge = getDesignKnowledgeForAnalysis();

  const prompt = `You are UISense, an expert AI design consultant that renovates website UIs based on evidence-based design literature. You analyze websites and provide specific, actionable CSS changes to improve their design.

${designKnowledge}

## YOUR TASK

Analyze the provided website screenshot and HTML structure for the website: ${url}

Identify specific UI/UX issues and provide CSS fixes that will create VISIBLE, MEANINGFUL improvements. Focus on:
1. Visual hierarchy — Are important elements prominent enough?
2. Typography — Font sizes, line heights, readability, contrast
3. Spacing & layout — Padding, margins, whitespace, alignment
4. Color & contrast — WCAG compliance, color harmony, CTA prominence
5. Navigation — Clarity, accessibility, discoverability
6. CTA effectiveness — Are call-to-action elements clear and prominent?
7. Content grouping — Gestalt principles applied correctly?
8. Consistency — Visual consistency across components

IMPORTANT RULES:
- Each CSS change must be VISUALLY NOTICEABLE in a before/after comparison
- Use specific CSS selectors that will actually match elements on the page
- Provide complete CSS properties (not partial)
- Ground EVERY recommendation in a specific design principle from the knowledge base
- Aim for 5-10 high-impact changes
- The CSS overrides field must combine ALL individual changes into valid CSS
- Make the improvements realistic and professional, not radical redesigns
- Focus on the most impactful changes that demonstrate clear design thinking

IMPORTANT: Return ONLY valid JSON with no markdown formatting, no code blocks, no backticks. Raw JSON only.

Return this exact JSON structure:
{
  "summary": "2-3 sentence overall assessment of the current design and what was improved",
  "overallScoreBefore": <number 0-100>,
  "overallScoreAfter": <number 0-100>,
  "changes": [
    {
      "component": "<Name of the UI component being changed>",
      "issue": "<What's wrong with it currently>",
      "recommendation": "<What we're changing and why>",
      "cssSelector": "<Specific CSS selector>",
      "cssChanges": "<CSS properties to apply>",
      "principle": "<Name of the design principle>",
      "source": "<Author or source of the principle>",
      "impact": "<critical|high|medium|low>"
    }
  ],
  "cssOverrides": "<All CSS changes combined as a single valid CSS string>"
}

Here is a simplified version of the page HTML structure:
${htmlSnippet.substring(0, 8000)}`;

  const client = getClient();
  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
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

  let jsonStr = textContent.text.trim();

  const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1].trim();
  }

  try {
    const result = JSON.parse(jsonStr) as AnalysisResult;
    return result;
  } catch {
    console.error('Failed to parse Claude response:', jsonStr.substring(0, 500));
    throw new Error('Failed to parse analysis results. Claude returned invalid JSON.');
  }
}
