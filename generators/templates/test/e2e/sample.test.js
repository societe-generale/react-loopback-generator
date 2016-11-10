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
      .waitForElementPresent('input#sg-pin', 1000)
      .element('css selector', 'input#sg-pin-2', function (result) {
        if (result.status !== -1) {
          console.log("--------------IT'S YOUR FIRST TIME-----------\n You must set");
        } else {
          client.setValue('input#sg-pin', '1212121')
            .click('button[type=submit]')
            .assert.urlContains('<%= applicationFolder %>');
        }
      })

  }
};
