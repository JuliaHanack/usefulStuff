// NOTE: testdata & config not included in this project
const restaurantListCommands = {
    checkCuisine() {
        this.expect.element('@burgerCuisine').to.be.present;
        this.click('@burgerCuisine');
    },

    checkFilters() {
        this.expect.element('@filterDiscount').to.be.present;
        this.click('[for="restaurant-filter-has_offers"]');
        this.expect.element('@filterDiscount').to.be.selected;
        this.expect.element('@filterLivetracking').to.be.present;
        this.click('[for="restaurant-filter-live_tracking"]');
        this.expect.element('@filterDiscount').to.be.selected;
        this.expect.element('@filterMov').to.be.present;
        this.click('@movMax10');
        this.waitForElementNotPresent('@groupOverlay');
        this.expect.element('@movValue').text.to.contain('Bis 10€');
    },

    checkSorting() {
        this.expect.element('@sortByRecommended').to.be.enabled;
        this.expect.element('@sortByRating').to.be.enabled;
        this.expect.element('@sortByMov').to.be.enabled;
        this.expect.element('@sortByDistance').to.be.enabled;
    },

    clickPagination() {
        this.expect.element('@paginationButton').to.be.present;
        this.click('@paginationButton');
        this.waitForElementPresent('@paginationButton');
        this.click('@paginationButton');
        this.waitForElementPresent('@paginationButton');
        this.click('@paginationButton');
        this.expect.element('@preorderGroup').to.be.present;
        this.expect.element('@closedGroup').to.be.present;
        this.expect.element('@recommendButton').to.be.enabled;
    },

    resetFilters() {
        this.waitForElementPresent('@noResults');
        this.expect.element('@noResults').text.to.contain('Leider können wir keine Lieferservices in deinem Liefergebiet finden.');
        this.assert.elementPresent('@resetFilter')
            .click('@resetFilter');
        this.expect.element('@recommendedGroup').text.to.equal('EMPFOHLENE RESTAURANTS');
        this.expect.element('@movValue').text.to.equal('Egal');
    },

    searchGoto() {
        this.waitForElementPresent('@gotoSlider');
        this.expect.element('@gotoTitle').text.to.equal('Deine letzten Lieferservices'.toUpperCase());
        this.expect.element('@gotoRestaurant').text.to.equal(TestData.testRestaurantName);
        this.click('@gotoRestaurant');
    },

    searchRestaurant() {
        this.expect.element('@deliveryAddress').text.to.equal(TestData.searchAddress);
        this.expect.element('@recommendedGroup').text.to.equal('EMPFOHLENE RESTAURANTS');
        this.click(`[title="${TestData.testRestaurantName}"]`);
    }
};

module.exports = {
    commands: [restaurantListCommands],
    elements: {
        burgerCuisine: {
            selector: '//*[@class="categories__chooser__item" and .//*[contains(text(), "Burger & Co")]]',
            locateStrategy: 'xpath'
        },
        closedGroup: {
            selector: '//*[contains(text(), "Zurzeit geschlossen")]',
            locateStrategy: 'xpath'
        },
        filterMov: {
            selector: '//*[@id="restaurants-filter"]/div/div[2]/div/input',
            locateStrategy: 'xpath'
        },
        gotoRestaurant: {
            selector: '//*[@id="restaurants-slider"]/div/div[2]/div/div/div[1]/div/a',
            locateStrategy: 'xpath'
        },
        movMax10: {
            selector: '//*[@id="restaurants-filter"]/div/div[2]/div/div[3]/div[1]',
            locateStrategy: 'xpath'
        },
        movValue: {
            selector: '//*[@id="restaurants-filter"]/div/div[2]/div/div[2]',
            locateStrategy: 'xpath'
        },
        preorderGroup: {
            selector: '//*[contains(text(), "Bald geöffnet")]',
            locateStrategy: 'xpath'
        },
        resetFilter: {
            selector: '//*[contains(text(), "Filter zurücksetzen")]',
            locateStrategy: 'xpath'
        },
        sortByDistance: {
            selector: '//*[@title="Distanz"]',
            locateStrategy: 'xpath'
        },
        sortByMov: {
            selector: '//*[@title="Mindestbestellwert"]',
            locateStrategy: 'xpath'
        },
        sortByRating: {
            selector: '//*[@title="Bewertung"]',
            locateStrategy: 'xpath'
        },
        sortByRecommended: {
            selector: '//*[@title="Empfohlen"]',
            locateStrategy: 'xpath'
        },
        deliveryAddress: '[class="user-address-summary__details__text"]',
        filterDiscount: 'input[id="restaurant-filter-has_offers"]',
        filterLivetracking: 'input[id="restaurant-filter-live_tracking"]',
        gotoSlider: '[class="content-slider content-slider--restaurants content-slider--goto"]',
        gotoTitle: '[class="slider-heading"]',
        groupOverlay: '[class="rl-overlay"]',
        noResults: '[class="no-restaurants-info"]',
        paginationButton: '[class="ghost-dark-button-m js-fetch-more"]',
        recommendButton: '[class="secondary-dark-button-m js-recommend-form-trigger content-block__button"]',
        recommendedGroup: '[class="title with-description"]'
    }
};
