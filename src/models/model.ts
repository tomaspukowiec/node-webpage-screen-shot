export interface Config {
  pageData: PageData[];
  mailer: Mailer;
}

export interface PageData {
  url: string;
  scrollToBottom: boolean;
  viewport: {
    width: number;
    height: number;
  };
  screenshot: {
    path: string;
    fullPage: boolean;
  };
  login: {
    url: string;
    selector: {
      user: string;
      pass: string;
      button: string;
    };
    auth: {
      user: string;
      pass: string;
    };
  };
}

export interface Mailer {
  host: string;
  port: string;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  mailOptions: {
    to: string;
    subject: string;
    text?: string;
    html?: string;
  };
  admin?: string;
}

export interface MailerAttachment {
  filename: string;
  path: string;
}
