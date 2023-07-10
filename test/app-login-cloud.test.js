'use strict'

const { describe, it, beforeEach, afterEach } = require('mocha');
const { assert } = require('chai');
const { Builder, By } = require('selenium-webdriver');
const { BatchInfo, Eyes } = require('@applitools/eyes-selenium');

describe('ACME Bank', () => {
  // Test-specific objects
  let driver;

  beforeEach(async function() {
    const now = new Date();
    driver = await getDriver();
    await driver.executeScript('applitools:startTest', {
      appName: 'demo.applitools.com',
      testName: this.currentTest.fullTitle(),
      batch: new BatchInfo('Selenium JS Mocha Exec Cloud', now, now.toUTCString())
    });
    await driver.manage().setTimeouts( { implicit: 3000 } );
  });

  it('validate login using cloud', async function() {
    await driver.get('https://demo.applitools.com/login-v3.html');
    // Modify the selector for login button
    if (process.env.UPDATE_SELECTOR === 'true') {
      await driver.executeScript("document.querySelector('#log-in').id = 'access'");
      await driver.executeScript("document.querySelector('#access').textContent = 'Access'");
    }
    // Log in using the desired credentials
    await driver.findElement(By.css('#username')).sendKeys('andy');
    await driver.findElement(By.css('#password')).sendKeys('i<3pandas');
    await driver.findElement(By.id('log-in')).click();
    // Validate the main page
    const closingTime = await driver.findElement(By.id('time')).getText();
    assert(closingTime, /Your nearest branch/);
  });
    
  afterEach(async function() {
    const status = this.currentTest.state === 'passed' ? 'Passed' : 'Failed';
    if (driver) {
      await driver.executeScript('applitools:endTest', {
        status: status
      });
    }
    await driver.quit();
  });

  const getDriver = async () => {
    return await new Builder()
      .usingServer(await Eyes.getExecutionCloudUrl())
      .withCapabilities({
        browserName: 'chrome',
        'applitools:options': {
          eyesServerUrl: process.env.APPLITOOLS_SERVER_URL,
          apiKey: process.env.APPLITOOLS_API_KEY,
          useSelfHealing: process.env.APPLITOOLS_SELF_HEALING === 'false' ? false : true
        }
      })
      .build();
  }
});

