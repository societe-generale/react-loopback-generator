module.exports = {
  src_folders: [
    'test/e2e', // Where you are storing your Nightwatch e2e/UAT tests
  ],
  output_folder: './e2e_reports', // reports (test outcome) output by nightwatch
  selenium: { // downloaded by selenium-download module (see readme)
    start_process: true, // tells nightwatch to start/stop the selenium process
    server_path: './node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-3.0.1.jar',
    cli_args: { // chromedriver is downloaded by selenium-download (see readme)
      'webdriver.chrome.driver': './node_modules/chromedriver/bin/chromedriver',
    },
  },
  test_settings: {
    default: {
      globals: {
        waitForConditionTimeout: 5000, // sometimes internet is slow so wait.
      },
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true, // set to false to test progressive enhancement
      },
    },
  },
  chrome: {
    desiredCapabilities: {
      browserName: 'chrome',
      javascriptEnabled: true, // set to false to test progressive enhancement
    },
  },
};
