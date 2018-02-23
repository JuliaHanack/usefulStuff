module.exports = {
    Login(browser) {
        const login = browser.page['login']();
        browser.page['homepage']().navigate();
        login.loginHomepage();
    },

    Logout(browser) {
        browser.waitForElementVisible('[data-qa="logged-in-control"]')
            .click('[data-qa="logged-in-control"]');
        browser.assert.elementPresent('[data-qa="logout"]')
            .click('[data-qa="logout"]');
        browser.waitForElementVisible('[data-qa="logged-out-control"]');
        browser.expect.element('[data-qa="logged-out-control"]').text.to.contain('Konto'.toUpperCase());
    },

    Register(browser) {
        const randomEmail = Math.random().toString(36).substring(2, 11).concat('@test.de');
        browser.waitForElementVisible('[data-qa="logged-out-control"]')
            .click('[data-qa="logged-out-control"]');
        browser.assert.elementPresent('[id="register"]')
            .click('[id="register"]');
        browser.assert.elementPresent('[data-qa="register_email"]');
        browser.setValue('[data-qa="register_email"]', randomEmail);
        browser.assert.elementPresent('[data-qa="register_password"]');
        browser.setValue('[data-qa="register_password"]', TestData.userData.loginPassword);
        browser.assert.elementPresent('[data-qa="register_repeat_password"]');
        browser.setValue('[data-qa="register_repeat_password"]', TestData.userData.loginPassword);
        browser.assert.elementPresent('[data-qa="register_button"]')
            .click('[data-qa="register_button"]');
        browser.waitForElementVisible('[data-qa="logged-in-control"]');
        browser.expect.element('[data-qa="logged-in-control"]').text.to.contain(randomEmail.toUpperCase());
        browser.end();
    }
};
