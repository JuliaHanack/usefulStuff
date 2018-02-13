// NOTE: testdata & config not included in this project
const TestData = require('../../testdata.js');

const orderConfirmationPageCommands = {
    orderStatus() {
        this.waitForElementPresent('@orderSuccess');
        this.expect.element('@orderSuccess').text.to.contain('Erwarteter Lieferzeitpunkt: morgen gegen 1:00 Uhr');
    },
    cartStatus() {
        this.expect.element('@restaurantName').text.to.contain(TestData.emailRestaurantName);
        this.expect.element('@shoppingCart').to.be.present;
    },
    customerStatus() {
        this.expect.element('@customerAddress').text.to.contain(TestData.userData.loginFirstName);
        this.expect.element('@customerAddress').text.to.contain(TestData.userData.loginLastName);
        this.expect.element('@customerAddress').text.to.contain(TestData.searchAddress);
        this.expect.element('@chatButton').to.be.enabled;
    }
};

module.exports = {
    commands: [orderConfirmationPageCommands],
    elements: {
        chatButton: '[data-qa="ocp_chat"]',
        customerAddress: '[data-qa="ocp_address"]',
        orderSuccess: '[class="order-status success"]',
        restaurantName: '[data-qa="ocp_restaurantName"]',
        shoppingCart: '[data-qa="ocp_cart"]'
    },
};
