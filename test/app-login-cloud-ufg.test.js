'use strict'

const { describe, it, beforeEach, afterEach } = require('mocha');
const { assert } = require('chai');
const { Builder, By } = require('selenium-webdriver');
const { BatchInfo,
  BrowserType,
  Configuration,
  DeviceName,
  Eyes,
  RectangleSize, 
  RunnerOptions,
  ScreenOrientation,
  Target, 
  VisualGridRunner } = require('@applitools/eyes-selenium');

describe('ACME Bank', () => {
  // Test control inputs to read once and share for all tests
  var headless;

  // Applitools objects to share for all tests
  let batch;
  let config;
  let runner;
    
  // Test-specific objects
  let driver;
  let eyes;

  before(() => {
    const now = new Date();
    headless = process.env.HEADLESS? ['headless'] : []
    runner = new VisualGridRunner(new RunnerOptions().testConcurrency(5));
    batch = new BatchInfo('Selenium JavaScript Mocha UFG', now, now.toUTCString());

    // Create a configuration object for Applitools Eyes.
    config = new Configuration();
    config.setApiKey(process.env.APPLITOOLS_API_KEY);
    config.setServerUrl(process.env.APPLITOOLS_SERVER_URL);
    config.setBatch(batch);
    config.setForceFullPageScreenshot(true);
    config.addBrowser(800, 600, BrowserType.CHROME);
    config.addBrowser(1600, 1200, BrowserType.FIREFOX);
    config.addBrowser(1024, 768, BrowserType.SAFARI);
    config.addDeviceEmulation(DeviceName.Pixel_2, ScreenOrientation.PORTRAIT);
    config.addDeviceEmulation(DeviceName.Nexus_10, ScreenOrientation.LANDSCAPE);
  });

  beforeEach(async function() {
    driver = await getDriver();
    await driver.manage().setTimeouts( { implicit: 10000 } );
    // Create an eyes object for visual testing
    eyes = new Eyes(runner);
    eyes.setConfiguration(config);
    await eyes.open(
      driver,                             // WebDriver to "watch"
      'ACME Bank',                        // The name of the app under test
      this.currentTest.fullTitle(),       // The name of the test case
      new RectangleSize(1024, 768)            // The viewport size for the local browser
    );
  });

  it('validate login using ufg and cloud', async () => {
    await driver.get('https://demo.applitools.com/login-v3.html');
    await eyes.check(Target.window().fully().withName('Login page'));
    // Modify the selector for login button
    await driver.executeScript("document.querySelector('#log-in').id = 'access'");
    // await driver.executeScript("document.querySelector('#access').textContent = 'Access'");
    // Modify the selector for username web-element
    await driver.executeScript("document.querySelector('#username').id = 'logonname'");
    // Log in using the desired credentials
    await driver.findElement(By.css('#username')).sendKeys('andy');
    await driver.findElement(By.css('#password')).sendKeys('i<3pandas');
    await driver.findElement(By.id('log-in')).click();
    // Validate the main page
    await eyes.check(Target.window().fully().withName('Main page').layout());
    const closingTime = await driver.findElement(By.id('time')).getText();
    assert(closingTime, /Your nearest branch/);
  });
    
  afterEach(async function() {
    await eyes.closeAsync();
    await driver.quit();
  });
    
  after(async () => {
    const resultsSummary = await runner.getAllTestResults();
    const results = resultsSummary.getAllResults().map(({testResults}) => testResults);
    console.log('\tEyes results at: ', results[0].appUrls.batch);
  });

  const getDriver = async () => {
    return await new Builder()
      .usingServer(await Eyes.getExecutionCloudUrl())
      .withCapabilities({
        browserName: 'chrome',
        'applitools:options': {
          useSelfHealing: process.env.APPLITOOLS_SELF_HEALING === 'false' ? false : true
        }
      })
      .build();
  }
});
