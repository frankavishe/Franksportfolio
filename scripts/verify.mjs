import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const errors = [];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(`[console] ${msg.text()}`);
});
page.on("pageerror", (err) => errors.push(`[pageerror] ${err.message}`));

async function shot(name) {
  await page.screenshot({ path: `scripts/screenshots/${name}.png` });
  console.log(`screenshot: ${name}.png`);
}

console.log("== Home page ==");
await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForSelector("h1");
await shot("01-hero");

const canvasCount = await page.locator("canvas").count();
console.log("starfield canvas elements:", canvasCount);

await page.locator("#projects").scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
await shot("02-projects");
const projectCards = await page.locator("#projects article").count();
console.log("featured project cards on home:", projectCards);

await page.locator("#experience").scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
await shot("03-experience");

await page.locator("#contact").scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
await shot("04-contact");
const contactFields = await page.locator("#contact input, #contact textarea").count();
console.log("contact form fields:", contactFields);

console.log("== Theme toggle ==");
const htmlBefore = await page.locator("html").getAttribute("class");
await page.getByRole("button", { name: /switch to (light|dark) mode/i }).click();
await page.waitForTimeout(300);
const htmlAfter = await page.locator("html").getAttribute("class");
console.log("theme class before:", htmlBefore);
console.log("theme class after: ", htmlAfter);
console.log("theme toggle changed dom:", htmlBefore !== htmlAfter);

console.log("== Accessibility / motion toggle ==");
await page.getByRole("button", { name: /reduce motion|motion off/i }).click();
await page.waitForTimeout(200);
const frozen = await page.locator("html").evaluate((el) => el.classList.contains("motion-frozen"));
console.log("motion-frozen applied after toggle:", frozen);
// toggle back off so it doesn't persist in localStorage for nothing
await page.getByRole("button", { name: /reduce motion|motion off/i }).click();

console.log("== /projects filtering ==");
await page.goto(`${BASE}/projects`, { waitUntil: "networkidle" });
await page.waitForSelector("article");
const allCount = await page.locator("article").count();
await page.getByRole("button", { name: "Web3" }).click();
await page.waitForTimeout(300);
const web3Count = await page.locator("article").count();
console.log(`projects: All=${allCount} Web3=${web3Count}`);
await shot("05-projects-filtered");

console.log("== /blog ==");
await page.goto(`${BASE}/blog`, { waitUntil: "networkidle" });
const postCount = await page.locator("a[href^='/blog/']").count();
console.log("blog post links:", postCount);
await page.locator("a[href^='/blog/']").first().click();
await page.waitForSelector("article h1");
await page.waitForTimeout(300);
const codeBlocks = await page.locator("pre code, pre[class*='language-']").count();
console.log("code blocks on post:", codeBlocks);
await shot("06-blog-post");

await browser.close();

console.log("\n== Console/page errors captured ==");
if (errors.length === 0) {
  console.log("none");
} else {
  errors.forEach((e) => console.log(e));
}
