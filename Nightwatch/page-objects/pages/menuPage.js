// NOTE: testdata & config not included in this project
const menuPageCommands = {
    addDrinkToCart() {
        this.click('@menuSectionDrink');
        this.click('@itemNameDrink')
            .waitForElementNotPresent('@spinner', 5000);
        this.expect.element('@expandLmiv').text.to.equal('Detaillierte Produktinformationen');
        this.assert.elementPresent('@addToCartButton')
            .click('@addToCartButton');
        this.waitForElementNotPresent('@spinner', 5000);
    },

    addFoodToCart() {
        this.waitForElementPresent('@shoppingCart');
        this.click('@menuSectionFood');
        this.click('@itemNameFood');
        this.assert.elementPresent('@addToCartButton')
            .click('@addToCartButton');
        this.waitForElementNotPresent('@spinner', 5000);
    },

    proceedToCheckout() {
        this.expect.element('@shoppingCart').to.be.enabled;
        // NOTE: explicit pause needed because script speed caused tripping
        this.api.pause(5000);
        this.click('@shoppingCart');
    },

    returnToRl() {
        this.waitForElementPresent('@shoppingCart', 5000);
        this.assert.elementPresent('@breadcrumb')
            .click('@breadcrumb');
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
            selector: `//*[contains(text(), "${TestData.itemNameFood}")]`,
            locateStrategy: 'xpath'
        },
        itemNameDrink: {
            selector: `//*[contains(text(), "${TestData.itemNameDrink}")]`,
            locateStrategy: 'xpath'
        },
        addToCartButton: '[data-qa="dish-details-add-cart"]',
        breadcrumb: '[class="icon-arrow-left header__banner__back-link__element js-back-link"]',
        expandLmiv: '[data-qa="expand-lmiv"]',
        gotoSlider: '[class="content-slider content-slider--restaurants content-slider--goto"]',
        shoppingCart: '[data-qa="cart-checkout"]',
        spinner: '[class="button action shopping-cart-summary js-normal-checkout loading shopping-cart-banner--notEmpty"]'
    }
};
