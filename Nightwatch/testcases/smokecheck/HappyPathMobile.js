module.exports = {
    '@disabled': false,
    '@tags': [],
    Homepage(browser) {
        const searchAddress = browser.page['searchAddress']();
        browser.page['homepage']().navigate();
        searchAddress.addressInput();
    },

    RestaurantList(browser) {
        const restaurantlist = browser.page['restaurantList']();
        restaurantlist.searchRestaurantMobile();
    },

    MenuPage(browser) {
        const menupage = browser.page['menuPage']();
        menupage.addFoodToCartMobile();
        menupage.addDrinkToCart();
        menupage.checkCartDetailsMobile();
        menupage.proceedToCheckout();
    },

    CheckoutPage(browser) {
        const checkoutpage = browser.page['checkout']();
        const login = browser.page['login']();
        login.loginCheckout();
        checkoutpage.checkCartContent();
        checkoutpage.selectDeliveryTimePreorder();
        checkoutpage.addFalsePaybackNumber();
        checkoutpage.addValidPaybackNumber();
        checkoutpage.checkCoupon();
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
