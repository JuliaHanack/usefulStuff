module.exports = {
    capabilities: {
        browserName: 'chrome',
        os: 'Windows',
        os_version: '10',
        'browserstack.user': 'USERNAME',
        'browserstack.key': 'ACCESS_KEY',
        'browserstack.debug': 'true',
        'browserstack.networkLogs': 'true',
        build: 'BUILD_NAME',
        project: 'PROJECT_NAME'
    },

    globalTimeout: 15000,

    url: {
        live: 'https://www.lieferheld.de/',
        local: 'localhost:8000',
        browserstack: 'http://hub-cloud.browserstack.com/wd/hub'
    }
};
