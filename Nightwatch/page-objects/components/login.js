const loginCommands = {
    loginHomepage() {
        this.waitForElementPresent('@accountNavigationLoggedOut')
            .click('@accountNavigationLoggedOut');
        this.assert.elementPresent('@loginEmail')
            .setValue('@loginEmail', [TestData.userData.loginEmail]);
        this.assert.elementPresent('@loginPassword')
            .setValue('@loginPassword', [TestData.userData.loginPassword]);
        this.click('@loginButton');
        this.waitForElementVisible('@welcomeMessage');
        this.waitForElementVisible('@accountNavigationLoggedIn');
        this.expect.element('@accountNavigationLoggedIn').text.to.equal(TestData.userData.loginFirstName.toUpperCase());
    },

    loginRestaurantList() {
        this.waitForElementPresent('@accountNavigationLoggedOut')
            .click('@accountNavigationLoggedOut');
        this.assert.elementPresent('@loginEmail')
            .setValue('@loginEmail', [TestData.userData.loginEmail]);
        this.assert.elementPresent('@loginPassword')
            .setValue('@loginPassword', [TestData.userData.loginPassword]);
        this.click('@loginButton');
        this.waitForElementVisible('@rlGroupHeader');
        this.waitForElementVisible('@accountNavigationLoggedIn');
        this.expect.element('@accountNavigationLoggedIn').text.to.equal(TestData.userData.loginFirstName.toUpperCase());
    },

    loginCheckout() {
        this.waitForElementVisible('@loginEmail')
            .clearValue('@loginEmail')
            .setValue('@loginEmail', [TestData.userData.loginEmail])
            .expect.element('@loginEmail').to.contain.value.which.matches(new RegExp([TestData.userData.loginEmail], 'i'));

        this.waitForElementVisible('@loginPassword')
            .clearValue('@loginPassword')
            .setValue('@loginPassword', [TestData.userData.loginPassword]);

        this.click('@loginButton');
        // NOTE: Giving the script time to catch up with DOM change
        this.waitForElementPresent('@userName');
        this.waitForElementPresent('@userStreet');
        this.waitForElementPresent('@userCity');
        this.waitForElementPresent('@userEmail');
        this.waitForElementPresent('@userPhone');
        this.waitForElementVisible('@userName')
            .expect.element('@userNameFirstName').text.to.equal(TestData.userData.loginFirstName);
    },

    logoutHomepage() {
        this.waitForElementVisible('@accountNavigationLoggedIn')
            .click('@accountNavigationLoggedIn');
        this.assert.elementPresent('@logoutButton')
            .click('@logoutButton');
        this.waitForElementVisible('@accountNavigationLoggedOut');
        this.expect.element('@accountNavigationLoggedOut').text.to.equal(locales.account.userAccount.toUpperCase());
    },

    registerHomepage() {
        const randomEmail = Math.random().toString(36).substring(2, 11).concat('@lhweb.de');
        this.waitForElementVisible('@accountNavigationLoggedOut')
            .click('@accountNavigationLoggedOut');
        this.assert.elementPresent('[id="register"]')
            .click('[id="register"]');
        this.assert.elementPresent('@registerEmail');
        this.setValue('@registerEmail', randomEmail);
        this.assert.elementPresent('@registerPassword');
        this.setValue('@registerPassword', TestData.userData.loginPassword);
        this.assert.elementPresent('@registerButton')
            .click('@registerButton');
        this.waitForElementVisible('@accountNavigationLoggedIn');
        this.expect.element('@accountNavigationLoggedIn').text.to.equal(randomEmail.toUpperCase());
    },

    checkCookieValues(cookie) {
        const formattedValues = JSON.parse(decodeURIComponent(cookie.value));
        console.log('Checks values from user_auth cookie');
        this.assert.equal(typeof formattedValues.token, 'string');
        this.assert.equal(formattedValues.id, TestData.userData.userId);
        this.assert.equal(formattedValues.isAuthenticated, true);
        this.assert.equal(formattedValues.isEmpty, false);
    },

    checkCookieDeletion(cookie) {
        console.log('Ensure user_auth cookie was deleted');
        this.assert.equal(Boolean(cookie), false);
    }
};

module.exports = {
    commands: [loginCommands],
    elements: {
        accountNavigationLoggedIn: '[data-qa="accountButton-loggedIn"]',
        accountNavigationLoggedOut: '[data-qa="accountButton-loggedOut"]',
        loginButton: '[data-qa="login_button"]',
        logoutButton: '[data-qa="logoutButton"]',
        loginEmail: '[data-qa="login_login-email"]',
        loginPassword: '[data-qa="login_login-password-js"]',
        registerButton: '[data-qa="register_button"]',
        registerEmail: '[data-qa="register_email"]',
        registerPassword: '[data-qa="register_password-js"]',
        rlGroupHeader: '[data-qa="header-restaurantGroup"]',
        userCity: '[data-qa="userCity-checkoutPage"]',
        userEmail: '[data-qa="userEmail-checkoutPage"]',
        userName: '[data-qa="userName-checkoutPage"]',
        userNameFirstName: '[data-qa="userName-checkoutPage"] span:first-child',
        userPhone: '[data-qa="userPhone-checkoutPage"]',
        userStreet: '[data-qa="userStreet-checkoutPage"]',
        welcomeMessage: '[data-qa="welcomeMessage-header"]'
    }
};
