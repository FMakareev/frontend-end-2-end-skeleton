https://www.sohamkamani.com/blog/2016/11/02/e2e-tests-and-screenshots-using-nightwatch-js/

# Frontend End 2 End skeleton

Это первая версия сборки для e2e тестов, пока поддерживается только x64 windows.

## Структура проекта

```text
- custom-commands           # пользовательские команды
- log                       # логи тестов
- node_modules/             # модули 
- reports/                  # отчеты
- reports/screenshots/      # скриншоты
- tests/                    # тесты
- tests_output/             # ?
nightwatch.json             # конфиг для nightwatch.js
```

## Системные требования

* Windows 8-10 x64
* Node.js 10+
* nightwatch.js

## Старт:

1. yarn or npm install - установка зависимостей
2. nightwatch - запуск тестов или nightwatch [path] где [path] - путь к тесту


## Best practices

### Работа со скриншотами

Для хранения сриншотов следую использовать такую стрктуру:

```text
/reports/screenshots/{browserName}/{testName}/{size}/{testName}_{size}_{action или state}-{mode}.png
```

Пример:

```text
/reports/screenshots/chrome/homepage/1024x768/homepage_1024x768_openauth-preloading.png
```


* `browserName` - имя браузера для которого запустился тест;
* `testname` - имя теста;
* `size` - разрешение, ***пример:** 1024x768*;
* `testName` - название теста, ***пример**: 'homepage_openauth'*;
* `action` - название тействия которое было выполнено, ***пример**: 'homepage_openauth'*;
* `state` - состояние в котором находится интерфейс, ***пример**: 'homepage_init'*;
* `mode` - модификатор, на случай если нет возможности не продублировать название, ***пример**: 'homepage_openauth_preloading'*;

## TODO

* настроить компоненты для сравнивания скриншотов
    * подборка вариантов решения:
        * https://github.com/Crunch-io/nightwatch-vrt
        * https://gist.github.com/richard-flosi/8a5d2e10b6609ab9d06a
        * https://github.com/iam404/nightwatch-screenshot-compare
        * https://markus.oberlehner.net/blog/visual-regression-testing-with-nightwatch-and-cucumber/
* настроить поддержку браузеров:
    * Opera
    * Firefox
    * IE
* настроить headless режим (без открытия окна браузера)
* поддержку запуска тестов на linux
* поддержку запуска тестов на mac
* поддержку запуска тестов на windows x32
* задавать разные разрешения окон
* продумать структуру хранения ответов
* мануалы
    * ~~настройка среды - настройка проекта с нуля с пояснением некоторых момнтов~~
    * ~~первый тест - разбор простого теста с пояснениями~~
    * работа с объектами страницы - что такое, зачем, каие есть кейсы использования
    * как граматно организовать тестирование авторизованных пользователей
    * создание своих команд для тестов
    * тестирование скриншотами - как делать скриншоты в тестах, зачем и как сравнивать новые скриншоты со старыми
    * тестирование drag \`n\` drop - https://github.com/html-dnd/html-dnd, https://github.com/RobK/nightwatchjs-drag-n-drop-example