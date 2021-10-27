# node-webpage-screen-shot

Simple Node APP to make screen-shot of defined webpages

## TODO

* possible to configure pages in config file (steps)
* screen-shot for page where is authentication
* Send results by e-mail

## Build & Installation

1. fork this git-repo
2. npm install
3. npm run build
4. -> This will generate (using webpack) bundled version in the ./dist/app.bundle.js

## Deploy & Run

1. Copy/Deploy app.bunde.js to your hosting with running Node env
2. node app.bundle.js
3. Make this script run (CRON JOB) every 1 hour or so

## NPM packages used

* puppeteer (API to control Chrome or Chromium)
* cheerio (Fast, flexible & lean implementation of core jQuery designed specifically for the server.)
* nodemailer (Send e-mails) 
