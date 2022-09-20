# node-webpage-screen-shot

Simple Node APP to make screen-shot of defined webpages and then send them by e-mail. Page screen-shot can be configured. Possible to make a screen-shot even for pages protected by authentication (Simple login form).

## Configuration

Requires **config.json** file in the ROOT

```abc
{
   "pageData":[
      {
         "url":"https://www.puktom.cz",
         "scrollToBottom":false,
         "viewport":{
            "width":1200,
            "height":720
         },
         "screenshot":{
            "path":"./screen-shot-puktom.png",
            "fullPage":true
         }
      },
      {
         "url":"https://www.example-web-page.com",
         "scrollToBottom":false,
         "viewport":{
            "width":1200,
            "height":720
         },
         "screenshot":{
            "path":"./screen-shot-example.png",
            "fullPage":false
         },
         "login":{
            "url":"https://www.example-web-page.com/login",
            "selector":{
               "user":"#usernameId",
               "pass":"#passwordId",
               "button":"#btnLogin"
            },
            "auth":{
               "user":"username",
               "pass":"mypassword"
            }
         },
         "cookie": {
            "selector": "#js-LayersReact div div div button:nth-child(2)"
         }
      }
   ],
   "mailer":{
      "host":"smtp.seznam.cz",
      "port":"465",
      "secure":true,
      "auth":{
         "user":"example@domain.com",
         "pass":"MySuperSecretPassword"
      },
      "mailOptions":{
         "to":"recipient1@domain.com, recipient2@domain.com",
         "subject":"Subject for email"
      },
      "admin":"admin@domain.com"
   }
}

```

## Build & Installation

1. fork this git-repo
2. npm install
3. npm run build
4. -> This will generate (using webpack) bundled version in the ./dist/app.bundle.js

## Deploy & Run

1. Copy/Deploy app.bunde.js to your hosting with running Node env
2. npm install --production
3. Adjust config.json based on your needs and copy it to the same location as app.bundle.js
4. node app.bundle.js
5. Make this script run (CRON JOB) every 1 hour or so
6. As default APP logs info messages to ./info.log and error messages to ./error.log

## NPM packages used

- puppeteer (API to control Chrome or Chromium)
- cheerio (Fast, flexible & lean implementation of core jQuery designed specifically for the server.)
- nodemailer (Send e-mails)
