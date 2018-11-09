const addressSearchCommands = {
    addressInput() {
        const address = [TestData.address.searchAddress];

        this.waitForElementVisible('@addressField', 2000)
            .clearValue('@addressField')
            .setValue('@addressField', address)
            .expect.element('@addressField').to.contain.value.which.matches(new RegExp(address, 'i'));
        this.waitForElementVisible('@submitAddress');
        this.expect.element('@submitAddress').to.be.enabled;
        this.click('@submitAddress');
    }
};

module.exports = {
    commands: [addressSearchCommands],
    elements: {
        addressField: '[data-qa="addressInput"]',
        submitAddress: '[data-qa="submit-address"]'
    }
};
