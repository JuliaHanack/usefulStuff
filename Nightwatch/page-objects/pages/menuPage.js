// NOTE: testdata & config not included in this project
const locales = require('../de-DE');
const TestData = require('../testdata.js');

const menuPageCommands = {
    addDrinkToCart() {
        this.click('@menuSectionDrink');
        this.click('@itemNameDrink')
            .waitForElementNotPresent('@spinner', 5000);
        this.expect.element('@expandLmiv').text.to.equal(locales.lightbox.dishDetails.showNutritionalInfo);
        this.assert.elementPresent('@addToCartButton')
            .click('@addToCartButton');
        this.waitForElementNotPresent('@spinner', 5000);
    },

    addFoodToCart() {
        this.waitForElementPresent('@shoppingCart');
        this.expect.element('@restaurantName').text.to.equal(TestData.emailRestaurantName);
        this.click('@menuSectionFood');
        this.click('@itemNameFood');
        this.assert.elementPresent('@addToCartButton')
            .click('@addToCartButton');
        this.waitForElementNotPresent('@spinner', 5000);
    },

    checkCartDetails() {
        this.expect.element('@payback').text.to.equal(locales.payback.yourPoints);
    },

    proceedToCheckout() {
        this.expect.element('@shoppingCart').to.be.enabled;
        // NOTE: explicit pause needed because script speed caused tripping
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
        menuSectionFood: {
            selector: `//*[contains(text(), "${TestData.menuSectionFood}")]`,
            locateStrategy: 'xpath'
        },
        menuSectionDrink: {
            selector: `//*[contains(text(), "${TestData.menuSectionDrink}")]`,
            locateStrategy: 'xpath'
        },
        itemNameFood: {
            selector: `//*[contains(text(), "${TestData.menuItem.itemNameFood}")]`,
            locateStrategy: 'xpath'
        },
        itemNameDrink: {
            selector: `//*[contains(text(), "${TestData.menuItem.itemNameDrink}")]`,
            locateStrategy: 'xpath'
        },
        addToCartButton: '[data-qa="submitButton-dishDetails"]',
        breadcrumbs: '[class="icon-arrow-left js-back-link back-link"]',
        discount: '[data-qa="discount"]',
        dishPrice: '[class="dish-details__price"]',
        expandLmiv: '[data-qa="expand-lmiv"]',
        payback: '[data-qa="paybackPoints-menuPage"]',
        restaurantName: '[class="headline"]',
        shoppingCart: '[data-qa="checkoutButton-cart"]',
        shoppingCartDisabled: '[class="button disabled"]',
        spinner: '[class="button action shopping-cart-summary js-normal-checkout loading shopping-cart-banner--notEmpty"]'
    }
};
