// NOTE: testdata & config not included in this project
const TestData = require('../../testdata.js');

const checkoutPageCommands = {
    login() {
        this.waitForElementPresent('@loginEmail')
            .setValue('@loginEmail', [TestData.userData.loginEmail])
            .setValue('@loginPassword', [TestData.userData.loginPassword]);
        this.click('@loginSubmit');
        // NOTE: Giving script time with implicit waits to catch up with DOM change
        this.waitForElementPresent('@userName');
        this.waitForElementPresent('@userStreet');
        this.waitForElementPresent('@userCity');
        this.waitForElementPresent('@userEmail');
        this.waitForElementPresent('@userPhone');
        this.expect.element('@userCredentialsAll').text.to.contain(TestData.userData.loginFirstName);
    },
    selectPreorder() {
        this.expect.element('@deliveryTimeImmediate').to.be.present;
        this.assert.elementPresent('@deliveryTimePreorder')
            .click('@deliveryTimePreorder')
            .click('@preorderDay')
            .click('@preorderTomorrow');
    },
    finalizeOrder() {
        this.assert.elementPresent('@paymentMethod')
            .click('@paymentMethod');
        this.expect.element('@orderSubmit').to.be.enabled;
        this.click('@orderSubmit');
    }
};

module.exports = {
    commands: [checkoutPageCommands],
    elements: {
        deliveryTimeImmediate: '[data-qa="deliver-now"]',
        deliveryTimePreorder: '[data-qa="preorder"]',
        loginEmail: '[data-qa="login_email"]',
        loginPassword: '[data-qa="login_password"]',
        loginSubmit: '[data-qa="login_button"]',
        orderSubmit: '[data-qa="order-confirmation"]',
        paymentMethod: '[data-payment-method="cash"]',
        preorderDay: '[data-qa="preorder-day"]',
        preorderTomorrow: '[value="tomorrow"]',
        userCity: '[data-qa="cp_userCity"]',
        userCredentialsAll: '[data-qa="cp_userName"]',
        userEmail: '[data-qa="cp_userEmail"]',
        userName: '[data-qa="cp_userName"]',
        userPhone: '[data-qa="cp_userPhone"]',
        userStreet: '[data-qa="cp_userStreet"]'
    },
};
