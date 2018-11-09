exports.command = function(cookie) {
    const browser = this;

    browser.url(TestData.url);
    browser.waitForElementVisible('body');
    browser.setCookie({
        name: cookie.name,
        value: cookie.value
    });
};
