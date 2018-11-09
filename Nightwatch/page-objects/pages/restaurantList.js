const restaurantListCommands = {
    checkCuisine() {
        this.assert.elementPresent('@selectingCuisine');
        this.click('@selectingCuisine');
    },

    checkFilters() {
        this.expect.element('@filterDiscount').to.be.present;
        this.click('@filterDiscountSelected');
        this.expect.element('@filterDiscount').to.be.selected;
        this.expect.element('@filterLivetracking').to.be.present;
        this.click('@filterLivetrackingSelected');
        this.expect.element('@filterDiscount').to.be.selected;
        this.expect.element('@filterMov').to.be.present;
        this.click('@movMax10');
        this.waitForElementNotPresent('@groupOverlay');
        this.expect.element('@movValue').text.to.contain(locales.movAndDf.indicator10);
    },

    checkSorting() {
        this.expect.element('@sortByRecommended').to.be.enabled;
        this.expect.element('@sortByRating').to.be.enabled;
        this.expect.element('@sortByMov').to.be.enabled;
        this.expect.element('@sortByDTE').to.be.enabled;
    },

    checkRestaurantGroup() {
        this.expect.element('@recommendedGroup').to.be.visible;
        this.expect.element('@recommendedGroupTitle').text.to.equal(locales.restaurantGroups.title.recommended.toUpperCase());
        this.api.elements('css selector', '[class="recommended-restaurant  promoted first-promoted last-promoted"]', function(result) {
            this.expect(result.value).to.have.length.at.least(1);
        });
        this.assert.elementPresent('@regularGroup');
        this.api.elements('css selector', '[data-qa="regularRestaurantItem"]', function(result) {
            this.expect(result.value).to.have.length.at.least(1);
        });
        this.assert.elementPresent('@preorderGroup');
        this.assert.elementPresent('@closedGroup');
    },

    clickPagination() {
        this.expect.element('@paginationButton').to.be.present;
        this.click('@paginationButton');
        this.waitForElementPresent('@paginationButton');
        this.click('@paginationButton');
        this.waitForElementPresent('@paginationButton');
        this.click('@paginationButton');
        this.expect.element('@preorderGroupTitle').to.be.present;
        this.expect.element('@closedGroupTitle').to.be.present;
        this.expect.element('@recommendButton').to.be.enabled;
    },

    resetFilters() {
        this.waitForElementPresent('@noResults');
        this.expect.element('@noResults').text.to.equal(locales.noFoundRestaurants.message);
        this.assert.elementPresent('@resetFilter')
            .click('@resetFilter');
        this.expect.element('@recommendedGroupTitle').text.to.equal(locales.restaurantGroups.title.recommended.toUpperCase());
        this.expect.element('@movValue').text.to.equal(locales.movAndDf.message.showAll);
    },

    searchGoto() {
        this.isVisible('@gotoTitle', result => {
            if (result.value === true) {
                this.expect.element('@gotoTitle').text.to.equal(locales.contentSlider.headings.goTo.toUpperCase());
                this.expect.element('@gotoRestaurant').text.to.equal(TestData.restaurantList.testRestaurantName);
                this.click('@gotoRestaurant');
            } else {
                this.expect.element('@emailRestaurant').to.be.visible;
                this.click('@emailRestaurant');
            }
        });
    },

    searchRestaurant() {
        this.expect.element('@deliveryAddress').text.to.equal(TestData.address.searchAddress);
        this.assert.elementPresent('@searchQueryField')
            .setValue('@searchQueryField', TestData.restaurantList.searchQueryTerm)
            .click('@searchQuerySubmit');
        this.waitForElementVisible('@testRestaurantName')
            .click('@testRestaurantName');
    },

    searchRestaurantMobile() {
        this.expect.element('@deliveryAddress').text.to.equal(TestData.address.searchAddress);
        this.assert.elementPresent('@filtersTabMobile')
            .click('@filtersTabMobile');
        this.assert.elementPresent('@searchQueryInputMobile')
            .click('@searchQueryInputMobile')
            .setValue('@searchQueryInputMobile', TestData.restaurantList.searchQueryTerm);
        this.click('@searchQuerySubmitMobile');
        this.waitForElementVisible('@testRestaurantName')
            .click('@testRestaurantName');
    }
};

module.exports = {
    commands: [restaurantListCommands],
    elements: {
        selectingCuisine: {
            selector: '//*[@id="main-content"]/div/div[2]/div/section[2]/div/section[3]/div/ul/li[8]/a',
            locateStrategy: 'xpath'
        },
        closedGroupTitle: {
            selector: '//*[contains(text(), "Zurzeit geschlossen")]',
            locateStrategy: 'xpath'
        },
        filterMov: {
            selector: '//*[@id="restaurants-filter"]/div/div[2]/div/input',
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
        preorderGroupTitle: {
            selector: '//*[contains(text(), "Bald geöffnet")]',
            locateStrategy: 'xpath'
        },
        resetFilter: {
            selector: '//*[contains(text(), "Filter zurücksetzen")]',
            locateStrategy: 'xpath'
        },
        searchQueryField: {
            selector: '(//input[@id="search-query"])[2]',
            locateStrategy: 'xpath'
        },
        searchQuerySubmit: {
            selector: '(//*[@id="search-apply"])[2]',
            locateStrategy: 'xpath'
        },
        sortByDistance: {
            selector: '//*[@title="Entfernung"]',
            locateStrategy: 'xpath'
        },
        sortByDTE: {
            selector: '//*[@title="Lieferzeit"]',
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
        closedGroup: '[data-qa="closedGroup"]',
        closedRestaurantLightbox: '[data-qa="availabilityLightbox-closed"]',
        deliveryAddress: '[class="user-address-summary__details__text"]',
        emailRestaurant: '[title="Email- automated tests"]',
        filterDiscount: 'input[id="restaurant-filter-has_feast_or_offer"]',
        filterDiscountSelected: '[for="restaurant-filter-has_feast_or_offer"]',
        filterLivetracking: 'input[id="restaurant-filter-live_tracking"]',
        filterLivetrackingSelected: '[for="restaurant-filter-live_tracking"]',
        filtersTabMobile: '[data-qa="filtersTab-mobile"]',
        gotoRestaurant: '[data-qa="contentSlider-restaurantName"]',
        gotoSlider: '[data-qa="contentSlider-restaurantList"]',
        gotoTitle: '[data-qa="title-contentSlider"]',
        groupOverlay: '[class="rl-overlay"]',
        noResults: '[data-qa="message-noResults"]',
        paginationButton: '[class="ghost-dark-button-m js-fetch-more"]',
        preorderGroup: '[data-qa="preorderGroup"]',
        recommendButton: '[class="ghost-dark-button-l js-recommend-form-trigger content-block__button"]',
        recommendedGroup: '[data-qa="recommendedGroup"]',
        recommendedGroupTitle: '[data-qa="groupTitle-restaurantList"]',
        regularGroup: '[data-qa="regularGroup"]',
        restaurantName: '[data-qa="restaurantName-restaurantList"]',
        restaurantNameClosed: '[class="restaurant__info__name restaurant__info__name--closed"]',
        searchQueryInputMobile: '[data-qa="searchQuery-input"]',
        searchQueryResult: '[class="active-query__term"]',
        searchQuerySubmitMobile: '[data-qa="apply-fitler-mobile"]',
        testRestaurantName: `[data-qa="regularRestaurantItem"] [title="${TestData.restaurantList.testRestaurantName}"]`
    }
};
