import puppeteer from 'puppeteer';
import { FILE_LOG_ERROR, PUPPETEER_OPTIONS } from './models/const';
import { Config } from './models/model';
import getConfigJSON from './libs/config';
import { log } from './libs/util';
import PageScreenShot from './classes/page-screen-shot';
import sendEmail from './libs/mail';

(async () => {
  const browser = await puppeteer.launch(PUPPETEER_OPTIONS);
  try {
    const { pageData, mailer }: Config = await getConfigJSON();

    await Promise.all(
      pageData.map(async (page) => {
        const browserPage = await browser.newPage();
        const pageScreenShot = new PageScreenShot(browserPage, page);
        await pageScreenShot.process();
      })
    )
      .then(() => {
        sendEmail(mailer, pageData);
      })
      .catch((error) => {
        const message = `Error in promises ${error}`;
        log(FILE_LOG_ERROR, message).then();
      });
  } catch (err: any) {
    log(FILE_LOG_ERROR, err).then();
  } finally {
    await browser.close();
  }
})();
