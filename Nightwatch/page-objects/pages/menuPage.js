const menuPageCommands = {
    addDrinkToCart() {
        this.click('@menuSectionDrink');
        this.waitForElementNotPresent('@menuSectionSelected');
        this.waitForElementVisible('@dishNameDrink');
        this.api.pause(3000);
        this.click('@dishNameDrink')
            .waitForElementNotPresent('@spinner', 5000);
        this.expect.element('@expandLmiv').text.to.equal(locales.lightbox.dishDetails.showNutritionalInfo);
        this.assert.elementPresent('@addToCartButton')
            .click('@addToCartButton');
        this.waitForElementNotPresent('@spinner', 5000);
    },

    addFoodToCart() {
        this.waitForElementPresent('@shoppingCart');
        this.expect.element('@restaurantName').text.to.equal(TestData.restaurantList.testRestaurantName);
        this.click('@menuSectionFood');
        this.waitForElementNotPresent('@menuSectionSelected');
        this.waitForElementVisible('@dishNameFood');
        this.api.pause(1000);
        this.click('@dishNameFood');
        this.expect.element('@dishPriceLightbox').text.to.equal(TestData.cart.dishPrice);
        this.assert.elementPresent('@addToCartButton')
            .click('@addToCartButton');
        this.waitForElementNotPresent('@spinner', 5000);
    },

    addFoodToCartMobile() {
        this.waitForElementPresent('@shoppingCartMobile');
        this.expect.element('@restaurantName').text.to.equal(TestData.restaurantList.testRestaurantName);
        this.click('@menuSectionNavigationMobile');
        this.waitForElementVisible('@menuSectionSelected')
            .click('@menuSectionSelected');
        this.waitForElementVisible('@dishNameFood');
        this.api.pause(1000);
        this.click('@dishNameFood');
        this.expect.element('@dishPriceLightbox').text.to.equal(TestData.cart.dishPrice);
        this.assert.elementPresent('@addToCartButton')
            .click('@addToCartButton');
        this.waitForElementNotPresent('@spinner', 5000);
    },

    checkCartDetails() {
        this.expect.element('@dishPriceCart').text.to.equal(TestData.cart.dishPrice);
        this.expect.element('@cartSum').text.to.equal(TestData.cart.cartSumTotal);
        this.expect.element('@payback').text.to.equal(locales.payback.yourPoints);
        this.expect.element('@shoppingCart').text.to.equal(TestData.cart.proceedToCheckoutMessage.toUpperCase());
    },

    checkCartDetailsMobile() {
        this.expect.element('@shoppingCartSubtotal').text.to.equal(TestData.cart.cartSumTotal);
        this.expect.element('@shoppingCartMessageOpen').text.to.equal(TestData.cart.cartMessage.toUpperCase());
        this.click('@shoppingCartMobile');
        this.expect.element('@dishPriceCart').text.to.equal(TestData.cart.dishPrice);
        this.expect.element('@cartSum').text.to.equal(TestData.cart.cartSumTotal);
        this.expect.element('@payback').text.to.equal(locales.payback.yourPoints);
        this.expect.element('@shoppingCart').text.to.equal(TestData.cart.proceedToCheckoutMessage.toUpperCase());
    },

    crosslisting() {
        this.isVisible('@restaurantName', result => {
            if (result.value === true) {
                console.log('=> Restaurant is currently open');
                this.expect.element('@restaurantName').text.to.equal(TestData.crosslisting.name);
                this.assert.elementPresent('[data-qa="addressInput"]')
                    .setValue('[data-qa="addressInput"]', TestData.crosslisting.address)
                    .click('[data-qa="submit-address"]');
                this.waitForElementVisible('@crosslistingDishItem');
                this.click('@crosslistingDishItem');
                this.assert.elementPresent('@addToCartButton')
                    .click('@addToCartButton');
                this.waitForElementNotPresent('@spinner', 5000);
            } else {
                console.log('=> Restaurant is currently closed');
                this.expect.element('@closedInfo').to.be.visible;
                this.expect.element('@closedRestaurantSlider').to.be.visible;
                this.assert.elementPresent('@crosslistingMenuSection');
                this.expect.element('@shoppingCartDisabled').to.be.present;
            }
        });
    },

    proceedToCheckout() {
        this.expect.element('@shoppingCart').to.be.enabled;
        // NOTE: pause needed because script speed caused tripping
        this.api.pause(5000);
        this.click('@shoppingCart');
    },

    returnToRl() {
        this.waitForElementPresent('@shoppingCart', 5000);
        this.assert.elementPresent('@breadcrumbs')
            .click('@breadcrumbs');
        this.waitForElementPresent('@gotoSlider');
    }
};

module.exports = {
    commands: [menuPageCommands],
    elements: {
        dishNameDrink: {
            selector: `//*[@class="menu-item__description" and .//*[contains(text(), "${TestData.cart.dishNameDrink}")]]`,
            locateStrategy: 'xpath'
        },
        dishNameFood: {
            selector: `//*[@class="menu-item__description" and .//*[contains(text(), "${TestData.cart.dishNameFood}")]]`,
            locateStrategy: 'xpath'
        },
        menuSectionFood: {
            selector: `//*[contains(text(), "${TestData.cart.menuSectionFood}")]`,
            locateStrategy: 'xpath'
        },
        menuSectionDrink: {
            selector: `//*[contains(text(), "${TestData.cart.menuSectionDrink}")]`,
            locateStrategy: 'xpath'
        },
        addToCartButton: '[data-qa="submitButton-dishDetails"]',
        breadcrumbs: '[data-qa="breadcrumbs-menuPage"]',
        cartSum: '[data-qa="cartSum-total"]',
        closedInfo: '[data-qa="closedInfo-menuPage"]',
        closedRestaurantSlider: '[data-qa="contentSlider-menuPage"]',
        crosslistingDishItem: '[data-item-id="7236436"]',
        discount: '[data-qa="discount"]',
        dishPriceCart: '[data-qa="dishPrice-cart"]',
        dishPriceLightbox: '[data-qa="dishPrice-lightbox"]',
        expandLmiv: '[data-qa="expand-lmiv"]',
        gotoSlider: '[data-qa="contentSlider-restaurantList"]',
        menuSectionNavigationMobile: '[data-qa="menuSectionNavigation-mobile"]',
        menuSectionSelected: '[data-qa="menuSectionSelected"]',
        payback: '[data-qa="paybackPoints-menuPage"]',
        restaurantName: '[data-qa="restaurantName-menuPage"]',
        shoppingCart: '[data-qa="checkoutButton-cart"]',
        shoppingCartMessageOpen: '[data-qa="message-shoppingCart-open"]',
        shoppingCartMobile: '[data-qa="shoppingCart-mobile"]',
        shoppingCartSubtotal: '[data-qa="subtotal-shoppingCart"]',
        shoppingCartDisabled: '[data-qa="checkoutButton-disbaled"]',
        spinner: '[class="button action shopping-cart-summary js-normal-checkout loading shopping-cart-banner--notEmpty"]'
    }
};
