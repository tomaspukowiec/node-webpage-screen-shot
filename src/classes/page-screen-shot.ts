import puppeteer from 'puppeteer';
import { PageData } from '../models/model';

const dateFormat = require('dateformat');

export default class PageScreenShot {
  private browserPage: puppeteer.Page;

  private pageData: PageData;

  constructor(browserPage: puppeteer.Page, pageData: PageData) {
    this.browserPage = browserPage;
    this.pageData = pageData;
  }

  public process = async () => {
    try {
      await this.login();
      await this.setViewPort();
      await this.cookie();
      await this.goToUrl();
      await this.scrollToBottom();
      await this.screenShot();
    } catch (err: any) {
      throw new Error(err);
    }
  };

  private login = async () => {
    if (
      'login' in this.pageData &&
      'url' in this.pageData.login &&
      'auth' in this.pageData.login &&
      'selector' in this.pageData.login
    ) {
      await this.browserPage.goto(this.pageData.login.url, {
        waitUntil: 'networkidle0',
      });
      await this.browserPage.type(
        this.pageData.login.selector.user,
        this.pageData.login.auth.user
      );
      await this.browserPage.type(
        this.pageData.login.selector.pass,
        this.pageData.login.auth.pass
      );
      await Promise.all([
        this.browserPage.click(this.pageData.login.selector.button),
        this.browserPage.waitForNavigation({ waitUntil: 'networkidle0' }),
      ]);
    }
  };

  private setViewPort = async () => {
    if (
      'viewport' in this.pageData &&
      'width' in this.pageData.viewport &&
      'height' in this.pageData.viewport
    ) {
      await this.browserPage.setViewport({
        width: this.pageData.viewport.width,
        height: this.pageData.viewport.height,
      });
    }
  };

  private goToUrl = async () => {
    const currentDate = dateFormat(new Date(), 'dd.mm.yyyy');
    const webPageUrl = this.pageData.url.replace('{dateTo}', currentDate);
    await this.browserPage.goto(webPageUrl, { waitUntil: 'networkidle0' });
  };

  private scrollToBottom = async () => {
    if ('scrollToBottom' in this.pageData && this.pageData.scrollToBottom) {
      await this.browserPage.evaluate(
        'window.scrollTo(0, document.body.scrollHeight)'
      );
    }
  };

  private cookie = async () => {
    if ('cookie' in this.pageData && 'selector' in this.pageData.cookie) {
      await this.browserPage.click(this.pageData.cookie.selector);
    }
  };

  private screenShot = async () =>
    this.browserPage.screenshot({
      path: this.pageData.screenshot.path,
      fullPage: this.pageData.screenshot.fullPage,
    });
}
