// NOTE: testdata & config not included in this project
const orderConfirmationPageCommands = {
    cartStatus() {
        this.expect.element('@restaurantName').text.to.contain(TestData.testRestaurantName);
        this.expect.element('@shoppingCart').to.be.present;
    },

    customerStatus() {
        this.expect.element('@customerAddress').text.to.contain(TestData.userData.loginFirstName);
        this.expect.element('@customerAddress').text.to.contain(TestData.userData.loginLastName);
        this.expect.element('@customerAddress').text.to.contain(TestData.searchAddress);
        this.expect.element('@chatButton').to.be.enabled;
    },

    orderStatus() {
        this.waitForElementPresent('@orderSuccess');
        this.expect.element('@orderSuccess').text.to.contain('Erwarteter Lieferzeitpunkt: morgen gegen 1:00 Uhr');
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
    }
};
