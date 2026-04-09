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
import puppeteer from 'puppeteer';
import { analyzeWebsite } from './analyze.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.post('/api/analyze', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    res.status(400).json({ error: 'URL is required' });
    return;
  }

  console.log(`\n[UISense] Analyzing: ${url}`);
  console.log('[UISense] Step 1/5: Launching browser...');

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    console.log('[UISense] Step 2/5: Loading website...');
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 2000));

    console.log('[UISense] Step 3/5: Capturing screenshot & HTML...');
    const beforeScreenshot = await page.screenshot({
      encoding: 'base64',
      fullPage: false,
    });

    const htmlSnippet = await page.evaluate(() => {
      const clone = document.documentElement.cloneNode(true) as HTMLElement;
      clone.querySelectorAll('script, style, svg, noscript, iframe').forEach((el) => el.remove());
      return clone.outerHTML;
    });

    console.log('[UISense] Step 4/5: Analyzing with Claude AI + Design Literature...');
    const analysis = await analyzeWebsite(
      beforeScreenshot as string,
      htmlSnippet,
      url
    );

    console.log(`[UISense] Found ${analysis.changes.length} design improvements`);
    console.log('[UISense] Step 5/5: Applying CSS improvements & capturing result...');

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

    await browser.close();
    browser = undefined;

    console.log('[UISense] Analysis complete!');

    res.json({
      beforeScreenshot: `data:image/png;base64,${beforeScreenshot}`,
      afterScreenshot: `data:image/png;base64,${afterScreenshot}`,
      summary: analysis.summary,
      overallScoreBefore: analysis.overallScoreBefore,
      overallScoreAfter: analysis.overallScoreAfter,
      changes: analysis.changes,
      cssOverrides: analysis.cssOverrides,
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
