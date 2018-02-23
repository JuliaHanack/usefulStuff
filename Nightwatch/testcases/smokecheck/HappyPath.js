module.exports = {
    Homepage(browser) {
        const searchAddress = browser.page['searchAddress']();
        browser.page['homepage']().navigate();
        searchAddress.addressInput();
    },

    RestaurantList(browser) {
        const restaurantlist = browser.page['restaurantList']();
        restaurantlist.searchRestaurant();
    },

    MenuPage(browser) {
        const menupage = browser.page['menuPage']();
        menupage.addFoodToCart();
        menupage.addDrinkToCart();
        menupage.proceedToCheckout();
    },

    CheckoutPage(browser) {
        const checkoutpage = browser.page['checkout']();
        const login = browser.page['login']();
        login.loginCheckout();
        checkoutpage.selectPreorder();
        checkoutpage.finalizeOrder();
    },

    OrderConfirmationPage(browser) {
        const orderConfirmationPage = browser.page['orderConfirmation']();
        orderConfirmationPage.orderStatus();
        orderConfirmationPage.cartStatus();
        orderConfirmationPage.customerStatus();
        browser.end();
    }
};
