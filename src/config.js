/**
 * Tutos
 * https://github.com/thoughtspeed7/node-smarter-config/blob/master/config/config.js
 *
 */

// .env config
require('dotenv').config();

// Variables environnement
const ENV = process.env;

console.log(`
    --- process.env [START]
    
    NODE_ENV=${ENV.NODE_ENV}

    SMTP_HOST=${ENV.SMTP_HOST}
    SMTP_AUTH=${ENV.SMTP_AUTH}
    SMTP_SECURE=${ENV.SMTP_SECURE}
    SMTP_PORT=${ENV.SMTP_PORT}
    
    SMTP_USERNAME=${ENV.SMTP_USERNAME}
    SMTP_PASSWORD=${ENV.SMTP_PASSWORD}
    
    SET_FROM=${ENV.SET_FROM}
    SET_FROM_NAME=${ENV.SET_FROM_NAME}
    REPLY_TO=${ENV.REPLY_TO}
    REPLY_TO_NAME=${ENV.REPLY_TO_NAME}
    
    --- process.env [END]`);

const config = {

    "development": {
        "config_id": "development",
        "host": "http://localhost",
        "app_name": "Products API",
        "app_desc": "Products API ...",
        "node_port": 3001,
        "json_indentation": 4,
        "database": "products_api"
    },
    "testing": {
        "config_id": "testing",
        "database": "my-app-db-test"
    },
    "staging": {
        "config_id": "staging",
        "node_port": 8080,
        "database": "my-app-db-stag"
    },
    "production": {
        "config_id": "production",
        "node_port": 8080,
        "database": "my-app-db-prod"
    }
};

/*DEV: isDevEnv(),
SERVICES_URI: isDevEnv() ? 'http://172.20.90.114/node/' : 'http://172.20.90.115/node/',
SERVICES_PORT: parseInt(process.env.PORT, 10) || 3000,

NODEMAILER: {
    host: ENV.SMTP_HOST,
    port: ENV.SMTP_PORT,
    secure: false,
    auth: {
        user: ENV.SMTP_USERNAME,
        pass: ENV.SMTP_PASSWORD
    }
},
DEFAULT_MAIL_ERROR_RECIPIENTS: "l.lelion@callmedicall.com"*/

const defaultConfig = config.development;
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];

// as a best practice
// all global variables should be referenced via global. syntax
// and their names should always begin with g
global.gConfig = environmentConfig;

// log global.gConfig
console.log(`global.gConfig: ${JSON.stringify(global.gConfig, undefined, global.gConfig.json_indentation)}`);

