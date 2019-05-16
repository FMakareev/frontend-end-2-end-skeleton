exports.command =  function(username, password) {
    this
        .url('https://buro.code-artel.com/')
        .waitForElementVisible('body', 5000)
        .setValue('input[name=email]', username)
        .setValue('input[name=password]', password)
        .click("button[type=submit]");

    return this;
};