var URL = "https://localhost:8000/<%= applicationFolder %>/";

module.exports = {
  'Should display Gaia authentification page': function (client) {
    client
    .url(URL)
    .useCss()
    .waitForElementVisible('body', 1000)
    .waitForElementPresent('input#sg-email', 1000)
    .waitForElementPresent('input#sg-password', 1000)
    .setValue('input#sg-email', 'user-test-test@socgen.com')
    .setValue('input#sg-password', 'user-test')
    .waitForElementPresent("button[type=submit]", 1000)
  },
  'Should display Main page of the Application': function (client) {
    client
    .click('button[type=submit]')
    .useCss()
    .waitForElementPresent('input#sg-pin', 1000)
    .setValue('input#sg-pin', '1212121')
    .click('button[type=submit]')
    .waitForElementPresent('script[src*=bundle]', 1000)
    .waitForElementVisible('body', 1000)
    .assert.urlContains('<%= applicationFolder %>/#/')
    .end();
  }
};
