module.exports = {
    'bureau-reg':browser => {

        const screenPath = './reports/screenshots/chrome/bureau/reg/1440x1024/bureau-auth_1440x1024';


        // Задаем разрешение окна браузера
        browser.windowSize('current', 1440, 1024);
        // выполняем переход по ссылке
        browser.url('http://buro.localhost/registration');

        // ожидае пока загрузится страница
        browser.waitForElementVisible('body', 5000);

        // нажали на селект
        browser.click('div[data-test-id=select-name-role]');

        // ждем открытия списка опций
        browser.waitForElementVisible('.react-select-menu-role', 1000);
        // нажимаем на опцию банка
        browser.click('.react-select-option-role-bank');

        // проверяем что в селекте выбранная нами роль
        browser.getValue('input[name=role]', function(result) {
            this.assert.equal(typeof result, "object");
            this.assert.equal(result.status, 0);
            this.assert.equal(result.value, "bank");
        });

        // проверяем что появилось поле для ввода имени банка и оно пустое
        browser.getValue('input[name=bankName]', function(result) {
            this.assert.equal(typeof result, "object");
            this.assert.equal(result.status, 0);
            this.assert.equal(result.value, "");
        });


        browser.pause(10000);
    }
};