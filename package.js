Package.describe({
    name         : 'okland:accounts-phone',
    version      : '0.0.1',
    // Brief, one-line summary of the package.
    summary      : 'A login service based on mobile phone number for Meteor',
    // URL to the Git repository containing the source code for this package.
    git          : 'https://github.com/okland/accounts-phone',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Npm.depends({
    "phone"         : "1.0.3",
    "twilio"        : "1.10.0",
    "stream-buffers": "0.2.5"});

Package.onUse(function (api) {
    api.use('npm-bcrypt@=0.7.7', 'server');

    api.use('accounts-base@1.0.x', ['client', 'server']);
    // Export Accounts (etc) to packages using this one.
    api.imply('accounts-base@1.0.x', ['client', 'server']);
    api.use('srp@1.0.x', ['client', 'server']);
    api.use('sha@1.0.x', ['client', 'server']);
    api.use('email@1.0.x', ['server']);
    api.use('random@1.0.x', ['server']);
    api.use('check@1.0.x');
    api.use('underscore@1.0.x');
    api.use('ddp@1.0.x', ['client', 'server']);
    api.addFiles('sms_server.js', 'server');
    api.addFiles('phone_server.js', 'server');
    api.addFiles('phone_client.js', 'client');

    api.export('SMS', 'server', {testOnly: true});
    api.export('SMSTest', 'server', {testOnly: true});
});

Package.onTest(function (api) {
    api.use(['okland:accounts-phone', 'tinytest', 'test-helpers', 'tracker',
        'accounts-base', 'random', 'underscore', 'check',
        'ddp']);
    api.addFiles('phone_tests_setup.js', 'server');
    api.addFiles('phone_tests.js', ['client', 'server']);
    api.addFiles('sms_tests_setup.js', 'server');
    api.addFiles('sms_tests.js', 'client');
});
