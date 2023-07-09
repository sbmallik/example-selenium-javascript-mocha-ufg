# Selenium JavaScript Mocha with the Ultrafast Grid

This is the example project for the `Selenium JavaScript Mocha` tutorial about running *functional* and *visual* tests in Applitools Execution Cloud.
It shows how to start automating visual tests with the [Applitools Eyes](https://applitools.com/platform/eyes/)
and the [Ultrafast Grid](https://applitools.com/platform/ultrafast-grid/)
using [Selenium WebDriver](https://www.selenium.dev/) in JavaScript. 
In addition, it adds the code to use `Self-Healing` capabilities provided by `Applitools Execution Cloud`.

It uses:

* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) as the programming language
* [Selenium WebDriver](https://www.selenium.dev/) for browser automation
* [Google Chrome](https://www.google.com/chrome/downloads/) as the local browser for testing
* [npm](https://www.npmjs.com/) for dependency management
* [Mocha](https://mochajs.org/) as the core test framework
* [Applitools Eyes](https://applitools.com/platform/eyes/) for visual testing

This example project requires the following:

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

All test cases are located in the folder `test`. The tests are listed as follows:

1. [`app-login.test.js`](test/app-login.test.js): Demonstrate a local selenium test that fails on a web-element selector update.
2. [`app-login-cloud.js`](test/app-login-cloud.test.js): Repeats the same test in Applitools execution cloud.
3. [`app-login-cloud-ufg.test.js`](test/app-login-cloud-ufg.test.js]: Repeats the previous test by using Ultra Fast Grid feature within the execution cloud.

To execute tests, please ensure the existing Applitools account **supports the execution cloud**. Next, set the environment variables as follows:

* `APPLITOOLS_API_KEY` to your [account's API key](https://applitools.com/tutorials/guides/getting-started/registering-an-account).
* `APPLITOOLS_SERVER_URL` to the pre-configured URL for Applitools Test Manager. Otherwise the [default URL](https://eyesapi.applitools.com) would be used.
* `APPLITOOLS_SELF_HEALING` set to 'false' if the self healing feature needs disabling. Otherwise *do nothing*.

Finally the specific tests can be executed with the following commands:

* Local selenium test: The first command passes the test. The next command introduces an update in one of the web-element selector and the test fails.

  ```bash
  npm test "simple login"
  UPDATE_SELECTOR=true npm test "simple login"
  ```

* Test in Applitools execution cloud: As in previous test, the first command is the sunny day situation. The subsequent command induces a selector update but the self healing feature by the Applitools execution cloud passes the test. The third command disables the self healing feature with the updated selector thereby failing the test.

  ```bash
  npm test "login using cloud"
  UPDATE_SELECTOR=true npm test "login using cloud"
  APPLITOOLS_SELF_HEALING=false UPDATE_SELECTOR=true npm test "login using cloud"
  ```

* Test in Applitools execution cloud along with UFG: The sequence of commands works exactly as in the previous case, this test uses Applitools UFG apart from execution cloud.

  ```bash
  npm test "login using ufg and cloud"
  UPDATE_SELECTOR=true npm test "login using ufg and cloud"
  APPLITOOLS_SELF_HEALING=false UPDATE_SELECTOR=true npm test "login using ufg and cloud"
  ```
