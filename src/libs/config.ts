import fs from 'fs';
import { FILE_CONFIG } from '../models/const';
import { Config } from '../models/model';
import { isEmpty } from './util';

const validateFields = async (configFile: Config) => {
  if (!configFile || isEmpty(configFile.pageData.length <= 0)) {
    throw new Error('-> Missing pageData configuration');
  }
  configFile.pageData.forEach((page) => {
    if (
      isEmpty(page.url) ||
      isEmpty(page.screenshot) ||
      isEmpty(page.screenshot.path)
    ) {
      throw new Error(
        '-> Missing mandatory fields for pageData object (url, screenshot.path)'
      );
    }
  });
  if (isEmpty(configFile.mailer)) {
    throw new Error('-> Missing mailer configuration');
  }
};

const getConfigJSON = async () => {
  if (!fs.existsSync(FILE_CONFIG)) {
    throw new Error(`${FILE_CONFIG} file does not exist!`);
  }
  try {
    const configFile: Config = JSON.parse(
      fs.readFileSync(FILE_CONFIG, 'utf-8')
    );
    await validateFields(configFile);
    return configFile;
  } catch (e) {
    throw new Error(`Error when parsing ${FILE_CONFIG} file!\n${e}`);
  }
};

export default getConfigJSON;
