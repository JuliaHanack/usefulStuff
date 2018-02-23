// NOTE: testdata & config not included in this project
const loginCommands = {
    loginHomepage() {
        this.waitForElementPresent('@loggedOutControl')
            .click('@loggedOutControl');
        this.assert.elementPresent('@loginEmail')
            .setValue('@loginEmail', [TestData.userData.loginEmail]);
        this.assert.elementPresent('@loginPassword')
            .setValue('@loginPassword', [TestData.userData.loginPassword]);
        this.click('@loginButton');
        this.waitForElementVisible('@loggedInControl');
        this.expect.element('@loggedInControl').text.to.contain(TestData.userData.loginFirstName.toUpperCase());
    },

    loginCheckout() {
        this.waitForElementPresent('@loginEmail')
            .setValue('@loginEmail', [TestData.userData.loginEmail])
            .setValue('@loginPassword', [TestData.userData.loginPassword]);
        this.click('@loginButton');
        // NOTE: Giving the script time with implicit waits to catch up with DOM change
        this.waitForElementPresent('@userName');
        this.waitForElementPresent('@userStreet');
        this.waitForElementPresent('@userCity');
        this.waitForElementPresent('@userEmail');
        this.waitForElementPresent('@userPhone');
        this.expect.element('@userCredentialsAll').text.to.contain(TestData.userData.loginFirstName);
    }
};

module.exports = {
    commands: [loginCommands],
    elements: {
        loggedInControl: '[data-qa="logged-in-control"]',
        loggedOutControl: '[data-qa="logged-out-control"]',
        loginButton: '[data-qa="login_button"]',
        loginEmail: '[data-qa="login_email"]',
        loginPassword: '[data-qa="login_password"]',
        userCity: '[data-qa="cp_userCity"]',
        userCredentialsAll: '[data-qa="cp_userName"]',
        userEmail: '[data-qa="cp_userEmail"]',
        userName: '[data-qa="cp_userName"]',
        userPhone: '[data-qa="cp_userPhone"]',
        userStreet: '[data-qa="cp_userStreet"]'
    }
};
