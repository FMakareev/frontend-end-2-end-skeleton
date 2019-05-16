module.exports = {
    'bureau-auth':browser => {

        const screenPath = './reports/screenshots/chrome/bureau-auth/1440x1024/bureau-auth_1440x1024'

        // Задаем разрешение окна браузера
        browser.windowSize('current', 1440, 1024);
        // выполняем переход по ссылке
        browser.url('https://buro.code-artel.com/');
        // ожидае пока загрузится страница
        browser.waitForElementVisible('body', 5000);

        // по атрибуту name получаю поле для ввода почты и ввожу почту
        browser.setValue('input[name=email]', 'fmakareev@gmail.com');
        browser.saveScreenshot(screenPath+'setValue-email');
        // по атрибуту name получаю поле для ввода пароля и ввожу пароль
        browser.setValue('input[name=password]', 'fmakareev@gmail.com');
        browser.saveScreenshot(screenPath+'setValue-password');

        // нажимаю на кнопку submit
        browser.click("button[type=submit]");
        browser.saveScreenshot(screenPath+'submit');

        // пауза для дебага
        browser.pause(5000);

        browser.saveScreenshot(screenPath+'profile');
        // проверяю что на странице на которую я попал есть полу ввода с name bankName и сравниваю его с ожидаемым мною значением в этом поле
        browser.getValue('input[name=bankName]', function(result) {
            this.assert.equal(typeof result, "object");
            this.assert.equal(result.status, 0);
            this.assert.equal(result.value, "BankTest");
        })

            // .saveScreenshot('./reports/screenshots/bureau/registration-role.png');
        // конец
        browser.end()
    }
}