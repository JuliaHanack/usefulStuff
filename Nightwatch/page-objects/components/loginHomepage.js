// NOTE: testdata & config not included in this project
const TestData = require('../../testdata.js');

const loginCommands = {
    login() {
        this.waitForElementPresent('@loggedOutControl')
            .click('@loggedOutControl');
        this.assert.elementPresent('@loginEmail')
            .setValue('@loginEmail', [TestData.userData.loginEmail]);
        this.assert.elementPresent('@loginPassword')
            .setValue('@loginPassword', [TestData.userData.loginPassword]);
        this.click('@loginButton');
        this.waitForElementVisible('@loggedInControl');
        this.expect.element('@loggedInControl').text.to.contain(TestData.userData.loginFirstName.toUpperCase());
    }
};

module.exports = {
    commands: [loginCommands],
    elements: {
        loggedInControl: '[data-qa="logged-in-control"]',
        loggedOutControl: '[data-qa="logged-out-control"]',
        loginButton: '[data-qa="login_button"]',
        loginEmail: '[data-qa="login_email"]',
        loginPassword: '[data-qa="login_password"]'
    },
};
