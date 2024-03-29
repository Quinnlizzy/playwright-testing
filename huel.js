// import playwright
const playwright = require('playwright');

//create async function for test scripts
async function basketTest() {
    //launch browser
    const browser = await playwright.chromium.launch({ headless: false });
    //create new page
    const page = await browser.newPage();
    await page.goto('https://huel.com/');
  }