// Import puppeteer for Chrome executable
const puppeteer = require('puppeteer');
process.env.CHROME_BIN = puppeteer.executablePath();

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],  // Added Angular framework
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false,  // leave Jasmine Spec Runner output visible
      jasmine: {
        timeoutInterval: 10000  // Increased timeout for CI environment
      }
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadlessCI'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--disable-web-security',
          '--remote-debugging-port=9222',
          '--headless=new'  // Updated to use the new headless mode
        ]
      }
    },
    singleRun: true,
    failOnEmptyTestSuite: false,
    restartOnFileChange: false,
    concurrency: Infinity
  });
};