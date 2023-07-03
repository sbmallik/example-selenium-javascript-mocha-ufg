# Selenium JavaScript Mocha with the Ultrafast Grid

This is the example project for the [Selenium JavaScript Mocha tutorial](https://applitools.com/tutorials/quickstart/web/selenium/javascript/mocha).
It shows how to start automating visual tests with the [Applitools Eyes](https://applitools.com/platform/eyes/)
and the [Ultrafast Grid](https://applitools.com/platform/ultrafast-grid/)
using [Selenium WebDriver](https://www.selenium.dev/) in JavaScript. In addition, it adds the code to use `Self-Healing` capabilities provided by `Applitools Execution Cloud`.

It uses:

* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) as the programming language
* [Selenium WebDriver](https://www.selenium.dev/) for browser automation
* [Google Chrome](https://www.google.com/chrome/downloads/) as the local browser for testing
* [npm](https://www.npmjs.com/) for dependency management
* [Mocha](https://mochajs.org/) as the core test framework
* [Applitools Eyes](https://applitools.com/platform/eyes/) for visual testing

To run this example project, you'll need:

1. A free [Applitools account](https://auth.applitools.com/users/register).
2. [Applitools Execution Cloud](https://applitools.com/platform/execution-cloud/) environment to run tests.
3. [Node.js](https://nodejs.org/en/) version 14 or higher.
4. A good JavaScript editor, such as [Visual Studio Code](https://code.visualstudio.com/docs/languages/javascript).
5. An up-to-date version of [Google Chrome](https://www.google.com/chrome/downloads/).
6. A corresponding version of [ChromeDriver](https://chromedriver.chromium.org/downloads).

To install project dependencies, run:

```bash
npm install
```

The main test case is [`acme-bank.test.js`](test/acme-bank.test.js).

To execute tests, set the environment variables as follows:

* `APPLITOOLS_API_KEY` to your [account's API key](https://applitools.com/tutorials/guides/getting-started/registering-an-account).
* `APPLITOOLS_SERVER_URL` to the pre-configured URL for Applitools Test Manager. Otherwise the [default URL](https://eyesapi.applitools.com) would be used.

Finally the tests can be executed with the following command:

```bash
npm test
```

**For full instructions on running this project, take our
[Selenium JavaScript Mocha tutorial](https://applitools.com/tutorials/quickstart/web/selenium/javascript/mocha)!**
