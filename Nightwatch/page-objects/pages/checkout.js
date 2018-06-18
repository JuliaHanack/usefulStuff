// NOTE: testdata & config not included in this project
const locales = require('../de-DE');

const checkoutPageCommands = {
    checkAdditionalInput() {
        this.click('@enterPayback')
            .setValue('@paybackInput', '1234567890')
            .click('@paybackButton');
        this.expect.element('@paybackError').text.to.equal(locales.payback.errorMessage);
        this.expect.element('@coupon').text.to.equal(locales.coupon.question);
        this.expect.element('@coupon').to.be.enabled;
    },

    crosslisting() {
        this.waitForElementVisible('@guestLoginContainer');
        this.assert.elementPresent('@shoppingCartTitle');
        this.assert.elementPresent('@shoppingCartSum');
        this.expect.element('@shoppingCartQuantity').text.to.equal('1');
        this.expect.element('@orderSubmit').to.be.enabled;
    },

    finalizeOrder() {
        this.assert.elementPresent('@paymentMethod')
            .click('@paymentMethod');
        this.expect.element('@orderSubmit').to.be.enabled;
        this.click('@orderSubmit');
    },

    selectDeliveryTime() {
        this.isVisible('@deliveryTimePreorder', result => {
            if (result.value === true) {
                console.log('=> Preorder delivery time is visible');
                this.click('@deliveryTimePreorder')
                    .click('@preorderDay')
                    .click('@preorderTomorrow');
            } else {
                console.log('=> Preorder delivery time is not visible');
                this.expect.element('@deliveryTimeImmediate').to.be.visible;
            }
        });
    }
};

module.exports = {
    commands: [checkoutPageCommands],
    elements: {
        coupon: '[data-qa="add-coupon"]',
        deliveryTimeImmediate: '[data-qa="deliver-now"]',
        deliveryTimePreorder: '[for="delivery-pre-order"]',
        guestLoginContainer: '[id="order-as-guest"]',
        orderSubmit: '[data-qa="submitButton-checkoutPage"]',
        enterPayback: '[data-qa="payback-inputField-collapsed"]',
        paybackButton: '[data-qa="payback-submitButton"]',
        paybackError: '[data-qa="payback-errorMessage"]',
        paybackInput: '[data-qa="payback-inputField-expanded"]',
        paymentMethod: '[data-payment-method="cash"]',
        preorderDay: '[data-qa="preorderDay"]',
        preorderTomorrow: '[value="tomorrow"]',
        shoppingCartQuantity: '[class="quantity"]',
        shoppingCartSum: '[class="sum item"]',
        shoppingCartTitle: '[class="flex-justify-between content-block__title"]'
    }
};
