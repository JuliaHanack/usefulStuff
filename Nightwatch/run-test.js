const script = require('commander');
const shell = require('shelljs');
const path = require('path');
const defaultEnv = 'chrome_64';
const Suits = {
    regression: 'regression',
    smokecheck: 'smokecheck'
};

// -------------------------------------------------------------------------------------------------
// CLI arguments

script
    .option('--browserstack <credentials>', 'Browserstack User credentials in username:key format')
    .option('--url <url>', 'url to run tests adainst, in format protocol://host:port')
    .option('--test-set [testSet]', 'available suites = smokecheck|regression. Other will be treated as specific test name.')
    .option('--env [env]', 'desired env (combination of browser name, browser version and OS)', defaultEnv)
    .option('--on-ci', 'run with specific settings for CI server')
    .option('--build-name [name]', 'build name to be shown in Browserstack UI')
    .option('--local [local]', 'run e2e tests against local instance with Browserstack Local Proxy', true)
    .parse(process.argv);

// We need to validate arguments before proceeding

if (!script.browserstack) {
    console.log('Option --browserstack is required.');
    script.outputHelp();
    process.exit(1);
}

if (!script.url) {
    console.log('Option --url is required.');
    script.outputHelp();
    process.exit(1);
}

// -------------------------------------------------------------------------------------------------
// Functions

function getPaths() {
    const root = path.resolve(__dirname, '../..');
    const tests = path.resolve(root, 'test/nightwatch');
    const nightwatchConf = path.resolve(tests, 'nightwatch.conf.js');
    // NOTE: CI not used yet
    const nightwatchTCReporter = path.resolve(tests, 'teamcity-reporter.js');
    const nightwatchBin = path.resolve(root, 'node_modules/nightwatch/bin/nightwatch');

    return { root, tests, nightwatchConf, nightwatchTCReporter, nightwatchBin };
}

function parseCredentials(args) {
    const credentials = args.browserstack;
    const [username, key]  = credentials.split(':');

    return {
        username,
        key
    };
}

function buildTestSetParam(args) {
    const testSet = args.testSet;

    switch (testSet) {
        case Suits.regression:
            return ` --group ${Suits.regression}`;
        case Suits.smokecheck:
            return ` --group ${Suits.smokecheck}`;
        default:
            return ` --test ${testSet}`;
    }
}

function buildCommand(args) {
    const paths = getPaths(args);
    let command = paths.nightwatchBin;

    command += ` -c ${paths.nightwatchConf}`;

    if (args.onCi) {
        command += ` --reporter ${paths.nightwatchTCReporter} --suiteRetries 2`;
    }

    command += buildTestSetParam(args);
    command += ` --env ${args.env}`;

    return command;
}

function buildEnv(args) {
    const { username, key } = parseCredentials(args);

    return Object.assign({}, process.env, {
        BROWSERSTACK_USERNAME: username,
        BROWSERSTACK_ACCESS_KEY: key,
        BROWSERSTACK_BUILD: args.buildName,
        BSTACK_LOCAL: args.local,
        RUN_ON_BSTACK: true,
        TEST_URL: args.url
    });
}

// -------------------------------------------------------------------------------------------------
// Script

const paths = getPaths();
const command = buildCommand(script);
const env = buildEnv(script);

console.log(`Dir: ${paths.tests}`);
console.log(`Config: ${paths.nightwatchConf}`);
console.log(`Command: ${command}`);

const result = shell.exec(command, {
    env
});

process.exit(result.code);
