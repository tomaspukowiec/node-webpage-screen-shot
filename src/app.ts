import { pageForScreenShot, PUPPETEER_OPTIONS } from './models/const';

const puppeteer = require('puppeteer');

const run = async () => {
  const browser = await puppeteer.launch(PUPPETEER_OPTIONS);
  const page = await browser.newPage();
  // await page.setViewport({ width: 1200, height: 720 });

  await page.goto(pageForScreenShot.url, { waitUntil: 'networkidle0' });

  // Scroll to the bottom of the page
  // await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');

  await page.screenshot({
    path: pageForScreenShot.screenShotName,
    fullPage: pageForScreenShot.fullPage,
  });
  await browser.close();
};

run().then(() => {
  console.log('JOB DONE');
});
