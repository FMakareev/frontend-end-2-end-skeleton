# FAQ

> примеры взяты из офф.документации: http://nightwatchjs.org/guide#test-groups

## Тестовые группы

Nightwatch позволяет организовать ваши тестовые сценарии в группы и 
запускать их по мере необходимости. Чтобы сгруппировать тесты вместе, 
просто поместите их в одну подпапку. Имя папки - это имя группы.

### Пример:

```text
tests/
  ├── logingroup
  |   ├── login_test.js
  |   └── otherlogin_test.js
  ├── addressbook
  |   ├── addressbook_test.js
  |   └── contact_test.js
  ├── chat
  |   ├── chatwindow_test.js
  |   ├── chatmessage_test.js
  |   └── otherchat_test.js
  └── smoketests
      ├── smoke_test.js
      └── othersmoke_test.js
```

1. Чтобы запустить только `smoketests` группу, вы должны сделать следующее:

```bash
nightwatch --group smoketests
```

2. Кроме того, если вы хотите пропустить запуск `smoketests` группы, 
вы должны сделать следующее:

```bash
nightwatch --skipgroup smoketests
```

3. Чтобы пропустить несколько групп, просто добавьте их через запятую:
   
```bash
nightwatch --skipgroup addressbook,chat
```

4. Чтобы запустить несколько групп, просто добавьте их через запятую:
   
```bash
nightwatch --group addressbook,chat
```

## Отключение тестов

Чтобы предотвратить запуск тестового модуля,
 просто установите `disabled` атрибут в этом модуле `true` следующим образом:

```js
module.exports = {
  '@disabled': true, // Это предотвратит запуск тестового модуля.

  'sample test': function (browser) {
    // test code
  }
};
```

Это может быть полезно, если вы не хотите запускать определенные тесты, 
которые, как известно, дают сбой.

## Отключение отдельных тестовых случаев

Отключение отдельных тестовых случаев в настоящее время не поддерживается "из коробки". 
Однако это может быть достигнуто относительно просто с простым обходным путем. 
Просто преобразовав метод теста в строку, Nightwatch проигнорирует его.

Вот пример:

```js
module.exports = {
  'sample test': function (browser) {
    // test code
  },

  // disabled            
  'other sample test': ''+function (browser) {
    // test code
  }
};
```