// import playwright
const playwright = require('playwright');

async function basketTest() {
    const browser = await playwright.chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://huel.com/');
  }