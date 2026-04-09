import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx > 0) {
        const key = trimmed.substring(0, eqIdx).trim();
        const value = trimmed.substring(eqIdx + 1).trim();
        process.env[key] = value;
      }
    }
  }
  const maskedKey = process.env.ANTHROPIC_API_KEY
    ? `${process.env.ANTHROPIC_API_KEY.substring(0, 12)}...`
    : 'NOT FOUND';
  console.log(`[UISense] Loaded env from ${envPath} (key: ${maskedKey})`);
} else {
  console.log(`[UISense] WARNING: .env not found at ${envPath}`);
}

import express from 'express';
import cors from 'cors';
import puppeteer, { type Page } from 'puppeteer';
import { analyzeWebsite } from './analyze.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '100mb' }));

async function dismissCookieBanners(page: Page): Promise<void> {
  const selectors = [
    // Common cookie consent button selectors
    '#onetrust-accept-btn-handler',
    '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll',
    '#CybotCookiebotDialogBodyButtonAccept',
    '.cc-accept', '.cc-btn.cc-dismiss',
    '[data-testid="cookie-accept"]',
    'button.accept-cookies',
    '#cookie-accept', '#accept-cookies',
    '.cookie-consent-accept',
    '.js-cookie-consent-agree',
    // Generic: find buttons with common accept text
  ];

  for (const selector of selectors) {
    try {
      const btn = await page.$(selector);
      if (btn) {
        await btn.click();
        console.log(`[UISense] Dismissed cookie banner via: ${selector}`);
        await new Promise((r) => setTimeout(r, 500));
        return;
      }
    } catch { /* continue */ }
  }

  // Fallback: find any button whose text contains accept/agree keywords
  try {
    const dismissed = await page.evaluate(() => {
      const keywords = [
        'accept all', 'accept cookies', 'agree', 'akkoord',
        'accepteren', 'alle accepteren', 'accept', 'toestaan',
        'allow all', 'allow cookies', 'got it', 'ok', 'i agree',
        'alle cookies accepteren', 'alles accepteren',
      ];
      const buttons = Array.from(document.querySelectorAll('button, a[role="button"], [class*="cookie"] a, [class*="cookie"] button, [class*="consent"] button'));
      for (const btn of buttons) {
        const text = (btn as HTMLElement).innerText?.toLowerCase().trim() || '';
        if (keywords.some((kw) => text.includes(kw))) {
          (btn as HTMLElement).click();
          return text;
        }
      }
      return null;
    });
    if (dismissed) {
      console.log(`[UISense] Dismissed cookie banner via text match: "${dismissed}"`);
      await new Promise((r) => setTimeout(r, 1000));
    }
  } catch { /* ignore */ }
}

const CAPTURE_W = 680;
const CAPTURE_H = 400;
const PAGE_W = 1440;

function buildClipAroundCenter(cx: number, cy: number, pageHeight: number) {
  const x = Math.max(0, Math.min(cx - CAPTURE_W / 2, PAGE_W - CAPTURE_W));
  const y = Math.max(0, Math.min(cy - CAPTURE_H / 2, pageHeight - CAPTURE_H));
  return { x, y, width: CAPTURE_W, height: Math.min(CAPTURE_H, pageHeight - y) };
}

async function captureComponentScreenshots(
  page: Page,
  changes: Array<{ cssSelector: string; component: string }>
): Promise<Record<string, string>> {
  const screenshots: Record<string, string> = {};
  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);

  for (let i = 0; i < changes.length; i++) {
    const { cssSelector, component } = changes[i];
    try {
      // Build a list of selectors to try, from most specific to broadest
      const candidates = [
        cssSelector,
        ...cssSelector.split(',').map((s) => s.trim()),
        cssSelector.split(' ').slice(0, 2).join(' '),
        cssSelector.split(' ')[0],
        cssSelector.replace(/>/g, ' '),
        cssSelector.replace(/::?[\w-]+/g, ''),           // strip pseudo-elements
        cssSelector.replace(/\[.*?\]/g, ''),              // strip attribute selectors
      ].filter((s, idx, arr) => s && s.trim() && arr.indexOf(s) === idx);

      let captured = false;

      for (const selector of candidates) {
        try {
          const el = await page.$(selector);
          if (!el) continue;
          const box = await el.boundingBox();
          if (!box || box.width < 5) continue;

          // Center a consistent capture region around the element
          const cx = box.x + box.width / 2;
          const cy = box.y + box.height / 2;
          const clip = buildClipAroundCenter(cx, cy, pageHeight);

          const shot = await page.screenshot({ encoding: 'base64', clip });
          screenshots[i.toString()] = `data:image/png;base64,${shot}`;
          console.log(`[UISense] Component preview: ${component} → ${selector}`);
          captured = true;
          break;
        } catch { /* try next */ }
      }

      // Fallback: capture a section of the page spread evenly across changes
      if (!captured) {
        const sliceY = Math.round((i / changes.length) * Math.max(pageHeight - CAPTURE_H, 0));
        const clip = buildClipAroundCenter(PAGE_W / 2, sliceY + CAPTURE_H / 2, pageHeight);
        const shot = await page.screenshot({ encoding: 'base64', clip });
        screenshots[i.toString()] = `data:image/png;base64,${shot}`;
        console.log(`[UISense] Component preview (region fallback): ${component}`);
      }
    } catch (err) {
      console.log(`[UISense] Could not capture "${component}": ${err}`);
    }
  }

  return screenshots;
}

app.post('/api/analyze', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    res.status(400).json({ error: 'URL is required' });
    return;
  }

  console.log(`\n[UISense] Analyzing: ${url}`);
  console.log('[UISense] Step 1/6: Launching browser...');

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    console.log('[UISense] Step 2/6: Loading website...');
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 2000));

    console.log('[UISense] Step 3/6: Dismissing cookie banners...');
    await dismissCookieBanners(page);
    await new Promise((r) => setTimeout(r, 500));

    console.log('[UISense] Step 4/6: Capturing screenshot & HTML...');
    const beforeScreenshot = await page.screenshot({
      encoding: 'base64',
      fullPage: false,
    });

    const htmlSnippet = await page.evaluate(() => {
      const clone = document.documentElement.cloneNode(true) as HTMLElement;
      clone.querySelectorAll('script, style, svg, noscript, iframe').forEach((el) => el.remove());
      return clone.outerHTML;
    });

    console.log('[UISense] Step 5/6: Analyzing with Claude AI + Design Literature...');
    const analysis = await analyzeWebsite(
      beforeScreenshot as string,
      htmlSnippet,
      url
    );

    console.log(`[UISense] Found ${analysis.changes.length} design improvements`);
    console.log('[UISense] Step 6/6: Applying redesign & capturing results...');

    // Inject content changes (JavaScript) first, before CSS
    if (analysis.jsOverrides) {
      try {
        await page.evaluate((js: string) => {
          try { eval(js); } catch (e) { console.warn('UISense JS override error:', e); }
        }, analysis.jsOverrides);
        console.log(`[UISense] Applied JS content overrides (${analysis.jsOverrides.length} chars)`);
        await new Promise((r) => setTimeout(r, 500));
      } catch (err) {
        console.log(`[UISense] JS override injection failed (non-fatal): ${err}`);
      }
    }

    if (analysis.cssOverrides) {
      await page.evaluate((css: string) => {
        const style = document.createElement('style');
        style.id = 'uisense-overrides';
        style.textContent = css;
        document.head.appendChild(style);
      }, analysis.cssOverrides);

      await new Promise((r) => setTimeout(r, 1000));
    }

    const afterScreenshot = await page.screenshot({
      encoding: 'base64',
      fullPage: false,
    });

    // Capture individual component screenshots from the "after" state
    console.log('[UISense] Capturing component screenshots...');
    const componentScreenshots = await captureComponentScreenshots(page, analysis.changes);

    await browser.close();
    browser = undefined;

    console.log(`[UISense] Analysis complete! (${Object.keys(componentScreenshots).length} component screenshots)`);

    res.json({
      beforeScreenshot: `data:image/png;base64,${beforeScreenshot}`,
      afterScreenshot: `data:image/png;base64,${afterScreenshot}`,
      summary: analysis.summary,
      overallScoreBefore: analysis.overallScoreBefore,
      overallScoreAfter: analysis.overallScoreAfter,
      changes: analysis.changes,
      cssOverrides: analysis.cssOverrides,
      componentScreenshots,
    });
  } catch (error) {
    if (browser) await browser.close();
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[UISense] Error:', message);
    res.status(500).json({ error: message });
  }
});

app.listen(PORT, () => {
  console.log(`\n  UISense Backend running on http://localhost:${PORT}`);
  console.log(`  Ready to analyze websites!\n`);
});
