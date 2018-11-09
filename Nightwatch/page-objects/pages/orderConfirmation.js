const orderConfirmationPageCommands = {
    cartStatus() {
        this.expect.element('@restaurantName').text.to.equal(TestData.restaurantList.testRestaurantName);
        this.expect.element('@dishNameFood').text.to.equal(TestData.cart.dishNameFood);
        this.expect.element('@dishNameDrink').text.to.equal(TestData.cart.dishNameDrink);
        this.expect.element('@dishPrice').text.to.equal(TestData.cart.dishPrice);
        this.expect.element('@cartSum').text.to.equal(TestData.cart.cartSumTotal);
        this.expect.element('@payback').text.to.equal(locales.order.payback.assumedPoints);
    },

    customerStatus() {
        this.expect.element('@customerInfo').text.to.equal(TestData.userData.userDataOcp);
        this.expect.element('@chatButton').to.be.enabled;
    },

    orderStatus() {
        this.waitForElementVisible('@orderSuccess');
        this.expect.element('@estimatedDeliveryTime').text.to.contain(TestData.estimatedDeliveryTime.ocpMessagePreorder);
    }
};

module.exports = {
    commands: [orderConfirmationPageCommands],
    elements: {
        dishNameDrink: {
            selector: `//*[contains(text(), "${TestData.cart.dishNameDrink}")]`,
            locateStrategy: 'xpath'
        },
        dishNameFood: {
            selector: `//*[contains(text(), "${TestData.cart.dishNameFood}")]`,
            locateStrategy: 'xpath'
        },
        cartSum: '[data-qa="cartSum-ocp"]',
        chatButton: '[data-qa="chat"]',
        customerInfo: '[data-qa="address-ocp"]',
        dishPrice: '[data-qa="dishPrice-cart"]',
        estimatedDeliveryTime: '[data-qa="estimatedDeliveryTime-ocp"]',
        orderSuccess: '[data-qa="oderStatus-success"]',
        payback: '[data-qa="payback-assumedPoints-ocp"]',
        restaurantName: '[data-qa="restaurantName-ocp"]',
        shoppingCart: '[data-qa="cart-ocp"]'
    }
};
