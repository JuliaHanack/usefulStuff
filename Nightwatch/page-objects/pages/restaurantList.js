// NOTE: testdata & config not included in this project
const TestData = require('../../testdata.js');

const restaurantListCommands = {
    searchRestaurant() {
        this.expect.element('@deliveryAddress').text.to.equal(TestData.searchAddress);
        this.expect.element('@recommendedGroup').text.to.equal('EMPFOHLENE RESTAURANTS');
        this.click(`[title="${TestData.emailRestaurantName}"]`);
    }
};

module.exports = {
    commands: [restaurantListCommands],
    elements: {
        deliveryAddress: '[class="user-address-summary__details__text"]',
        recommendedGroup: '[class="title with-description"]'
    },
};
