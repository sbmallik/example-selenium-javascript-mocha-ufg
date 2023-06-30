'use strict'

const { describe, it, beforeEach, afterEach } = require('mocha');
const { assert } = require('chai');
const { Builder, By } = require('selenium-webdriver');
const { Eyes, 
  VisualGridRunner, 
  RunnerOptions,
  Target, 
  RectangleSize, 
  BatchInfo,
  BrowserType,
  ScreenOrientation,
  DeviceName } = require('@applitools/eyes-selenium');

describe('ACME Bank', () => {
  // Test control inputs to read once and share for all tests
  var applitoolsApiKey;
  var applitoolsServerUrl;
  var headless;

  // Applitools objects to share for all tests
  let batch;
  let config;
  let runner;
    
  // Test-specific objects
  let driver;
  let eyes;

  beforeEach(async function() {
    const now = new Date();
    headless = process.env.HEADLESS? ['headless'] : []
    runner = new VisualGridRunner(new RunnerOptions().testConcurrency(5));
    batch = new BatchInfo('Selenium JavaScript Mocha UFG', now, now.toUTCString());

    // Create an eyes object for visual testing
    eyes = new Eyes(runner);
    // Create a configuration for Applitools Eyes.
    config = eyes.getConfiguration();
    config.setApiKey(process.env.APPLITOOLS_API_KEY);
    config.setServerUrl(process.env.APPLITOOLS_SERVER_URL);
    config.setBatch(batch);
    config.setForceFullPageScreenshot(true);
    config.addBrowser(800, 600, BrowserType.CHROME);
    config.addBrowser(1600, 1200, BrowserType.FIREFOX);
    config.addBrowser(1024, 768, BrowserType.SAFARI);
    config.addDeviceEmulation(DeviceName.Pixel_2, ScreenOrientation.PORTRAIT);
    config.addDeviceEmulation(DeviceName.Nexus_10, ScreenOrientation.LANDSCAPE);
    eyes.setConfiguration(config);
    /*
    driver = new Builder()
      .withCapabilities({
        browserName: 'chrome',
        'goog:chromeOptions': {
          args: headless,
        },
      })
      .build()
      */
    driver = await getDriver();
    /*
    await driver.executeScript('applitools:startTest', {
      appName: 'demo.applitools.com',
      testName: this.currentTest.fullTitle()
    });
    */
    await driver.manage().setTimeouts( { implicit: 10000 } );
    await eyes.open(
      driver,                             // WebDriver to "watch"
      'ACME Bank',                        // The name of the app under test
      this.currentTest.fullTitle(),       // The name of the test case
      new RectangleSize(1024, 768)            // The viewport size for the local browser
    );
  });

  it('should log into a bank account', async () => {
    await driver.get('https://demo.applitools.com/login-v3.html');
    await eyes.check(Target.window().fully().withName('Login page'));
    await driver.executeScript("document.querySelector('#log-in').id = 'access'");
    await driver.executeScript("document.querySelector('#access').textContent = 'Access'");
    await driver.findElement(By.css('#username')).sendKeys('andy');
    await driver.findElement(By.css('#password')).sendKeys('i<3pandas');
    await driver.findElement(By.id('log-in')).click();
    await eyes.check(Target.window().fully().withName('Main page').layout());
    const closingTime = await driver.findElement(By.id('time')).getText();
    assert(closingTime, /Your nearest branch/);
  });
    
  afterEach(async function() {
    /*
    const status = this.currentTest.state === 'passed' ? 'Passed' : 'Failed';
    if (driver) {
      await driver.executeScript('applitools:endTest', {
        status: status
      });
    }
    */
    try {
      await eyes.close(false);
        const resultsSummary = await runner.getAllTestResults();
        const results = resultsSummary.getAllResults().map(({testResults}) => testResults);
        console.log('\tEyes results at: ', results[0].appUrls.batch);
    }
    finally {
      if (driver) await driver.quit();
    }
    // await driver.quit();
  });
    
  /*
  after(async () => {
    const allTestResults = await runner.getAllTestResults();
    console.log(allTestResults);
  });
  */

  const getDriver = async () => {
    return await new Builder()
      .usingServer(await Eyes.getExecutionCloudUrl())
      .withCapabilities({
        browserName: 'chrome'/*,
        'applitools:options': {
          eyesServerUrl: process.env.APPLITOOLS_SERVER_URL,
          apiKey: process.env.APPLITOOLS_API_KEY,
          useSelfHealing: true
        }
        */
      })
      .build();
  }
});

