'use strict'

const { describe, it, beforeEach, afterEach } = require('mocha');
const { assert } = require('chai');
const { Builder, By } = require('selenium-webdriver');

describe('ACME Bank', () => {
  // Test control inputs to read once and share for all tests
  var headless;
    
  // Test-specific objects
  let driver;

  beforeEach(async function() {
    driver = new Builder()
      .withCapabilities({
        browserName: 'chrome',
        'goog:chromeOptions': {
          args: headless,
        },
      })
      .build();
    await driver.manage().setTimeouts( { implicit: 3000 } );
  });

  it('validate simple login', async () => {
    await driver.get('https://demo.applitools.com/login-v3.html');
    // Modify the selector for login button
    // await driver.executeScript("document.querySelector('#log-in').id = 'access'");
    // await driver.executeScript("document.querySelector('#access').textContent = 'Access'");
    // Log in using the desired credentials
    await driver.findElement(By.css('#username')).sendKeys('andy');
    await driver.findElement(By.css('#password')).sendKeys('i<3pandas');
    await driver.findElement(By.id('log-in')).click();
    // Validate the main page
    const closingTime = await driver.findElement(By.id('time')).getText();
    assert(closingTime, /Your nearest branch/);
  });
    
  afterEach(async function() {
    await driver.quit();
  });
});

