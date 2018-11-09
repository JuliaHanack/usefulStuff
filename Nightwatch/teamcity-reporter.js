function escapeMessage(message) {
    if (message === null || message === undefined) {
        return '';
    }

    return message
        .toString()
        // Strip ANSI (console) codes from message output
        .replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '')
        .replace(/\|/g, '||')
        .replace(/'/g, '|\'')
        .replace(/\n/g, '|n')
        .replace(/\r/g, '|r')
        .replace(/\u0085/g, '|x')
        .replace(/\u2028/g, '|l')
        .replace(/\u2029/g, '|p')
        .replace(/\[/g, '|[')
        .replace(/\]/g, '|]');
}

function teamCityReporter(result, options, done) {
    Object.keys(result.modules).forEach(function (moduleName) {

        var moduleResult = result.modules[moduleName];
        var suitName = escapeMessage(moduleName);
        var completed = moduleResult.completed;

        console.log(`##teamcity[testSuiteStarted name='${suitName}']`);
        moduleResult.skipped.forEach(function(testName) {
            console.log(`##teamcity[testIgnored name='${testName}']`);
        });
        Object.keys(completed).forEach(function (name) {

            var test = completed[name];
            var testName = escapeMessage(name);
            var assertion = test.assertions.reduce(function (curr, total) {
                total.message = !total.failure ? `${curr.message}\n${total.message}` : curr.message;
                return total;
            });

            console.log(`##teamcity[testStarted name='${testName}']`);
            console.log(`##teamcity[testStdOut name='${testName}' out='${escapeMessage(assertion.message)}']`);
            if (assertion.failure) {
                console.log(`##teamcity[testFailed name='${testName}' details='${escapeMessage(assertion.fullMsg + assertion.stackTrace)}']`);
            }
            console.log(`##teamcity[testFinished name='${testName}' duration='${test.timeMs}']`);
        });

        console.log(`##teamcity[testSuiteFinished name='${suitName}']`);
    });
    done();
}

module.exports = {
    write: teamCityReporter
};
