module.exports = {
    before: function (browser) {
        console.log('Setting up...');
        browser
            .userLogin('fmakareev@gmail.com', 'fmakareev@gmail.com');
    },
    'check bank name': function (browser) {
        browser
            .waitForElementVisible('input[name=bankName]')
            .getValue("input[name=bankName]", function(result) {
                this.assert.equal(result.value, "BankTest");
            })
    },
    'change phone number': function (browser) {
        browser
            .waitForElementVisible('input[name=bankName]')
            .clearValue('input[name=phone]')
            .setValue('input[name=phone]', '70009988776')
            .getValue("input[name=phone]", function(result) {
                this.assert.equal(result.value, '70009988776');
            })
            .end();
    },
};