const locales = require('../de-DE');
const TestData = require('../testdata.js');

const orderConfirmationPageCommands = {
    cartStatus() {
        this.expect.element('@restaurantName').text.to.contain(TestData.emailRestaurantName);
        this.expect.element('@shoppingCart').to.be.present;
        this.expect.element('@payback').text.to.contain(locales.order.payback.assumedPoints);
    },

    customerStatus() {
        this.expect.element('@customerAddress').text.to.contain(TestData.userData.loginFirstName);
        this.expect.element('@customerAddress').text.to.contain(TestData.userData.loginLastName);
        this.expect.element('@customerAddress').text.to.contain(TestData.searchAddress);
        this.expect.element('@chatButton').to.be.enabled;
    },

    orderStatus() {
        this.waitForElementPresent('@orderSuccess');
        this.expect.element('@orderSuccess').text.to.contain('Erwarteter Lieferzeitpunkt');
    }
};

module.exports = {
    commands: [orderConfirmationPageCommands],
    elements: {
        chatButton: '[data-qa="chat"]',
        customerAddress: '[data-qa="address-ocp"]',
        orderSuccess: '[class="order-status success"]',
        payback: '[data-qa="payback-assumedPoints-ocp"]',
        restaurantName: '[data-qa="restaurantName-ocp"]',
        shoppingCart: '[data-qa="cart-ocp"]'
    }
};
