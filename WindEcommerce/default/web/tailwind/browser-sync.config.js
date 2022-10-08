const deepmerge = require('deepmerge');
const fs = require('fs');
const path = require('path');
const url = require('url');

let baseDir = path.resolve(__dirname);
//let magentoDir = baseDir + '/../../../../../';

do {
    baseDir = baseDir.split('/').slice(0, -1).join('/');
} while (baseDir !== '' &&  !fs.existsSync(baseDir + '/app'))


if (baseDir === '') {
    console.log('error unable locate your magento project directory');
    require('process').exit(1);
}

let proxy = process.env.PROXY_URL || 'https://app.contribution.test';
let port = process.env.PORT || 3000;
let host = url.parse(proxy);

if (typeof process.env.PROXY_URL === 'undefined') {
    console.log('unable locate proxy url');
    console.log('PROXY_URL="https://app.contribution.test" npm run browser-sync', "\n");
}

module.exports = {
    proxy,
    host,
    port,
    rewriteRules: []
}
