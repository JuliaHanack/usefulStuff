const TEST_DATA = require('../../testdata');

module.exports = {
    login: function partOne(browser) {
        browser.page['homepage']().navigate();
        browser.waitForElementPresent('[data-qa="logged-out-control"]')
            .click('[data-qa="logged-out-control"]');
        browser.assert.elementPresent('[data-qa="login_email"]')
            .setValue('[data-qa="login_email"]', [TEST_DATA.loginEmail]);
        browser.assert.elementPresent('[data-qa="login_password"]')
            .setValue('[data-qa="login_password"]', [TEST_DATA.loginPassword]);
        browser.click('[data-qa="login_button"]');
        browser.waitForElementPresent('[data-qa="address-field"]');
        browser.waitForElementVisible('[data-qa="logged-in-control"]');
        browser.expect.element('[data-qa="logged-in-control"]').text.to.contain(TEST_DATA.loginName.toUpperCase());
    },
    logout: function partTwo(browser) {
        browser.waitForElementVisible('[data-qa="logged-in-control"]')
            .click('[data-qa="logged-in-control"]');
        browser.assert.elementPresent('[data-qa="logout"]')
            .click('[data-qa="logout"]');
        browser.waitForElementPresent('[data-qa="address-field"]');
        browser.waitForElementVisible('[data-qa="logged-out-control"]');
        browser.expect.element('[data-qa="logged-out-control"]').text.to.contain('Konto');
    }
};
