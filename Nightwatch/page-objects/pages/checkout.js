const checkoutPageCommands = {
    finalizeOrder() {
        this.assert.elementPresent('@paymentMethod')
            .click('@paymentMethod');
        this.expect.element('@orderSubmit').to.be.enabled;
        this.click('@orderSubmit');
    },

    selectPreorder() {
        this.expect.element('@deliveryTimeImmediate').to.be.present;
        this.assert.elementPresent('@deliveryTimePreorder')
            .click('@deliveryTimePreorder')
            .click('@preorderDay')
            .click('@preorderTomorrow');
    }
};

module.exports = {
    commands: [checkoutPageCommands],
    elements: {
        deliveryTimeImmediate: '[data-qa="deliver-now"]',
        deliveryTimePreorder: '[data-qa="preorder"]',
        orderSubmit: '[data-qa="order-confirmation"]',
        paymentMethod: '[data-payment-method="cash"]',
        preorderDay: '[data-qa="preorder-day"]',
        preorderTomorrow: '[value="tomorrow"]'
    }
};
