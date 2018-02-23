// NOTE: testdata & config not included in this project
const addressSearchCommands = {
    addressInput() {
        this.waitForElementPresent('[data-qa="address-field"]')
            .setValue('[data-qa="address-field"]', [TestData.searchAddress]);
        this.expect.element('[data-qa="find_restaurants"]').to.be.enabled;
        this.click('[data-qa="find_restaurants"]');
    }
};

module.exports = {
    commands: [addressSearchCommands],
    elements: {
        addressField: '[data-qa="address-field"]',
        submitAddress: '[data-qa="find_restaurants"]'
    }
};
