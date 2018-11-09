const checkoutPageCommands = {
    checkCoupon() {
        this.isVisible('@paymentMethodSelected', result => {
            if (result.value === true) {
                this.expect.element('@coupon').to.not.be.present;
                this.expect.element('@couponErrorMessage').text.to.equal(locales.coupon.description);
            } else {
                console.log('=> Cash was not last used payment method');
                this.expect.element('@coupon').text.to.equal(locales.coupon.question);
                this.expect.element('@coupon').to.be.enabled;
            }
        });
    },

    addFalsePaybackNumber() {
        this.click('@editPayback');
        this.waitForElementVisible('@paybackInput')
            .setValue('@paybackInput', TestData.payback.invalidCard.number)
            .click('@paybackButton');
        this.expect.element('@paybackError').text.to.equal(locales.payback.errorMessage);
    },

    addValidPaybackNumber() {
        this.waitForElementVisible('@paybackInput')
            .clearValue('@paybackInput')
            .setValue('@paybackInput', TestData.payback.validCard.number)
            .click('@paybackButton');
        this.expect.element('@paybackCardNumber').to.be.present;
        this.expect.element('@paybackCardNumber').text.to.equal(`${locales.order.payment.endWith}${TestData.payback.validCard.lastDigits}`);
    },

    checkCartContent() {
        this.waitForElementVisible('@dishNameFood')
            .expect.element('@dishNameFood').text.to.equal(TestData.cart.dishNameFood);
        this.waitForElementVisible('@dishNameDrink')
            .expect.element('@dishNameDrink').text.to.equal(TestData.cart.dishNameDrink);
        this.waitForElementVisible('@dishPrice')
            .expect.element('@dishPrice').text.to.equal(TestData.cart.dishPrice);
        this.waitForElementVisible('@cartSum')
            .expect.element('@cartSum').text.to.equal(TestData.cart.cartSumTotal);
    },

    crosslisting() {
        this.waitForElementVisible('@guestLoginContainer');
        this.assert.elementPresent('@shoppingCartTitle');
        this.assert.elementPresent('@shoppingCartSum');
        this.expect.element('@shoppingCartQuantity').text.to.equal(TestData.cart.dishAmount);
        this.expect.element('@orderSubmit').to.be.enabled;
    },

    finalizeOrder() {
        this.waitForElementVisible('@paymentMethod');
        this.expect.element('@paymentMethod').to.be.enabled;
        this.click('@paymentMethod');
        this.expect.element('@orderSubmit').to.be.enabled;
        this.click('@orderSubmit');
    },

    selectDeliveryTimePreorder() {
        this.waitForElementVisible('@deliveryTimePreorder');
        this.click('@deliveryTimePreorder')
            .click('@preorderDay')
            .click('@preorderTomorrow');
    }
};

module.exports = {
    commands: [checkoutPageCommands],
    elements: {
        cartSum: '[data-qa="cartSum-total"]',
        coupon: '[data-qa="add-coupon"]',
        couponErrorMessage: '[data-qa="coupon-errorMessage"]',
        deliveryTimeImmediate: '[data-qa="deliver-now"]',
        deliveryTimePreorder: '[for="delivery-pre-order"]',
        dishName: 'div[data-qa="cartItem"]:nth-of-type(1) [data-qa="cartItemName"]',
        drinkName: 'div[data-qa="cartItem"]:nth-of-type(2) [data-qa="cartItemName"]',
        dishPrice: '[data-qa="dishPrice-cart"]',
        guestLoginContainer: '[id="order-as-guest"]',
        orderSubmit: '[data-qa="submitButton-checkoutPage"]',
        editPayback: '[data-qa="payback-editButton"]',
        paybackButton: '[data-qa="payback-submitButton"]',
        paybackError: '[data-qa="payback-errorMessage"]',
        paybackInput: '[data-qa="payback-inputField-expanded"]',
        paybackCardNumber: '[data-qa="payback-cardNumber"]',
        paymentMethod: '[data-payment-method-name="cash"]',
        paymentMethodSelected: '[class="cash  active  js-payment-method payment-methods__method"]',
        preorderDay: '[data-qa="preorderDay"]',
        preorderTomorrow: '[value="tomorrow"]',
        shoppingCartQuantity: '[data-qa="cartQuantity"]',
        shoppingCartSum: '[data-qa="cartSum"]',
        shoppingCartTitle: '[class="flex-justify-between content-block__title"]'
    }
};
