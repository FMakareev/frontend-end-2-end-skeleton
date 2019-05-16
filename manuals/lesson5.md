# Расширение Nightwatch

## Написание пользовательских команд

Большую часть времени вам нужно будет расширять команды Nightwatch в 
соответствии с потребностями вашего собственного приложения. 
Для этого достаточно создать отдельную папку и определить 
свои собственные команды внутри, каждая в своем собственном файле.

Затем укажите путь к этой папке в `nightwatch.json` файле в качестве `custom_commands_path` 
свойства. Имя команды - это имя самого файла.

Существует два основных способа определения настраиваемой команды:

### Команды в функциональном стиле

Это самая простая форма, в которой определяются команды, однако они также весьма ограничены.

Командный модуль должен экспортировать command функцию, 
которая должна вызывать хотя бы один метод API Nightwatch (например, .execute()). 
Это связано с ограничением работы асинхронной системы очередей команд. 
Вы также можете обернуть все в [.perform()](http://nightwatchjs.org/api/perform.html) вызове. 
Клиентские команды, такие как [.perform()](http://nightwatchjs.org/api/perform.html) и 
[.execute()](http://nightwatchjs.org/api/execute.html) доступны через this.

```js
exports.command =  function(username, password) {
    this
        .url('https://buro.code-artel.com/')
        .waitForElementVisible('body', 5000)
        .setValue('input[name=email]', username)
        .setValue('input[name=password]', password)
        .click("button[type=submit]");

    return this;
};
```

Эта команда выполняет авторизацию на сайте.

В приведенном выше примере определяется команда (например, userLogin.js), выполняет авторизацию на сайте.

С помощью этой команды тест будет выглядеть примерно так:

```js
module.exports = {
    'test 1': function (browser) {
        browser
            .userLogin('fmakareev@gmail.com', 'fmakareev@gmail.com')        
            .waitForElementVisible('input[name=bankName]')
            .getValue("input[name=bankName]", function(result) {
                this.assert.equal(result.value, "BankTest");
            })
            .end();
    }
};
```

Что тут происходит:

1) Мы вызываем нашу пользовательскую команду передав в нее логин и пароль пользователя, мы не вызываем метод 
[url()](http://nightwatchjs.org/api/url.html) т.к. он выполняется в нашей пользовательской команде и после ее вызова у нас уже открыта нужная нам страница.
2) после того как мы авторизовались мы ждем появления поля с названием банка
3) проверяем какое значение введено в поле с именем `bankName`
4) Завершаем тест.

Наш код пока еще не очень оптимален т.к. нам придется в каждом тестовом случае вызывать по новой метод `userLogin`,
это приведет к тому что тесты будут выполнятся значительно дольше и потреблять много ресурсов системы. Для того чтобы нам оптимизировать наши тесты используем
хук [before](http://nightwatchjs.org/guide#using-before-each-and-after-each-hooks).

## Использование хука before

[before](http://nightwatchjs.org/guide#using-before-each-and-after-each-hooks) позволяет нам выполнить любой код до выполнения наших тестов, 
в нашем случае мы выполним авторизацию переход на сайт и авторизацию, таким образом все последующие тесты 
будут проходить так как будто пользователь уже авторизован.

Пример:

```js
module.exports = {
    before: function (browser) {
        browser
            .userLogin('fmakareev@gmail.com', 'fmakareev@gmail.com');
    },
    'test 1': function (browser) {
        browser
            .waitForElementVisible('input[name=bankName]')
            .getValue("input[name=bankName]", function(result) {
                this.assert.equal(result.value, "BankTest");
            })
            .end();
    }
};
``` 

Давайте разовьем пример и добавим еще один тестовый случай. Мы будем менять номер телефона в поле для ввода.

Пример:

```js
module.exports = {
    before: function (browser) {
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
``` 

Из кейса `'check bank name'` мы убрали вызов метода `.end()` это позволит нам выполнить следующий 
тест в том же окне браузера с той же сессией.

> Не забывайте всегда вызывать метод `.end()`, когда хотите закрыть тест, чтобы сессия браузера была правильно закрыта.

Далее мы добавили новый кейс с названием `'change phone number'`. В этом кейсе происходит следующее:

1. дожидаемся появления html элемента у которого атрибут `name` равен `phone`
2. Удаляем содержимое этого поля, это необходимо сделать прежде чем вызывать метод `setValue` т.к. этот метод не перезаписывает значение поля, 
а добавляет к старому значению новое.
3. записываем новое значение в поле
4. проверяем что в поле корректное значение, в нашем случае на поле есть дополнительный код обрабатывающий ввод и нам стоит проверить что значение которое 
получилось соответствует ожидаемому
5. закрываем тест и сессию браузера.

