module.exports = {
    Goto(browser) {
        const login = browser.page['login']();
        const searchAddressHp = browser.page['searchAddress']();
        const menupage = browser.page['menuPage']();
        const goto = browser.page['restaurantList']();
        browser.page['homepage']().navigate();
        searchAddressHp.addressInput();
        browser.waitForElementPresent('[class="user-address-summary js-change-address"]');
        login.loginHomepage();
        goto.searchGoto();
        menupage.returnToRl();
    },

    Pagination(browser) {
        const pagination = browser.page['restaurantList']();
        pagination.clickPagination();
    },

    Sorting(browser) {
        const sorting = browser.page['restaurantList']();
        sorting.checkSorting();
    },

    Filters(browser) {
        const filters = browser.page['restaurantList']();
        filters.checkFilters();
    },

    Cuisines(browser) {
        const cuisine = browser.page['restaurantList']();
        cuisine.checkCuisine();
    },

    Reset(browser) {
        const reset = browser.page['restaurantList']();
        reset.resetFilters();
        browser.end();
    }
};
