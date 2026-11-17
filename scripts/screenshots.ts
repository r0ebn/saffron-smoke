/**
 * Screenshots: render the built HTML in Chromium and capture it.
 *
 *   npm run screenshots   (run `npm run build` first)
 *
 * Writes docs/screenshots/email.png, page.png, document.png, plus 390px
 * mobile captures of the email and page, and copies the canvas PNG in as
 * canvas.png. The screenshots are the README's visuals — and the design
 * check: read them before calling the kit done.
 */
import { copyFile, mkdir, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { homedir } from "node:os";
import { pathToFileURL } from "node:url";
import { chromium, type Browser } from "playwright";

const ROOT = dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
const OUT = join(ROOT, "out");
const SHOTS = join(ROOT, "docs", "screenshots");

async function launchBrowser(): Promise<Browser> {
  try {
    return await chromium.launch();
  } catch {
    // Fall back to a cached Chromium from ~/.cache/ms-playwright.
    const cache = join(homedir(), ".cache", "ms-playwright");
    const entries = await readdir(cache).catch(() => []);
    const candidates = entries
      .filter((e) => e.startsWith("chromium-"))
      .sort()
      .reverse()
      .map((e) => join(cache, e, "chrome-linux", "chrome"));
    for (const executablePath of candidates) {
      if (!existsSync(executablePath)) continue;
      try {
        console.log(`using cached Chromium at ${executablePath}`);
        return await chromium.launch({ executablePath });
      } catch {
        // try the next one
      }
    }
    throw new Error("No Chromium available: run `npx playwright install chromium` first.");
  }
}

async function shot(browser: Browser, file: string, name: string, width: number): Promise<void> {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(pathToFileURL(join(OUT, file)).href);
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(800); // let the web fonts swap in
  await page.screenshot({ path: join(SHOTS, name), fullPage: true });
  console.log(`  wrote docs/screenshots/${name} (${width}px)`);
  await page.close();
}

async function main(): Promise<void> {
  await mkdir(SHOTS, { recursive: true });
  const browser = await launchBrowser();
  try {
    await shot(browser, "email.html", "email.png", 700);
    await shot(browser, "email.html", "email-mobile.png", 390);
    await shot(browser, "page.html", "page.png", 1280);
    await shot(browser, "page.html", "page-mobile.png", 390);
    await shot(browser, "menu-print.html", "document.png", 1000);
  } finally {
    await browser.close();
  }
  await copyFile(join(OUT, "social.png"), join(SHOTS, "canvas.png"));
  console.log("  copied out/social.png → docs/screenshots/canvas.png");
  console.log("\n✓ screenshots complete — read them in docs/screenshots/.");
}

main().catch((e: unknown) => {
  console.error(e);
  process.exitCode = 1;
});
