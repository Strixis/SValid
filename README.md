# SValid

SValid позволяет производить валидацию формы по вашим правилам не беспокоясь о поисках элементов на странице.

## Что делает:

* Находит форму.
* Находит поля внутри формы.
* Находит описание ошибок внутри формы.
* Находит кнопку внутри формы.
* Формирует массив правил для проверки.
* Формирует массив с результатами проверки каждого поля.
* Формирует результат проверки.
* Изменяет видимость описания ошибки в зависимости от результат проверки поля и настроек.
* Изменяет оформление поля в зависимости от результата проверки поля и настроек.

## Как использовать:

0. Написать функции для проверки полей. Задать зависимость между полем и функцией.

```
function checkfirstfield(fieldvalue) {/*some code*/ return boolean};
function checksecondfield(fieldvalue) {/*some code*/ return boolean};

const dict = {
  'firstfieldselector': checkfirstfield,
  'secondfieldselector': checksecondfield
};
```

1. Скачать скрипт svalid.js или модуль svalid-module.js.
2. Подключить.

  `<script src="svalid.js"></script>`
  или
  `import {SValid} from "your_path/svalid-module.js"`

3. Создать новый экземпляр класса.

  `const yourname = new SValid();`
  
4. Передать настройки и инициализировать.
  
  ```
  const yoursettings = {// here will be your settings};
  yourname.init(yoursettings);
  или
  yourname.init({// here will be your settings});
  ```

5. Назначить кнопке обработчик события и написать функцию обработки.

Если хотим чтобы валидация производилась после нажатия кнопки:

  ```
  yourname.button.addEventListener('click', (e) => {
    yourname.run();
    if (yourname.valid) {
      console.log('Ok')
    } else {
      e.preventDefault();
      console.log('Not ok');
    };
  });
  ```

Если хотим чтобы валидация производилась сразу:

  ```
  yourname.run();
  yourname.button.addEventListener('click', (e) => {
    yourname.run();
    if (yourname.valid) {
      console.log('Ok')
    } else {
      e.preventDefault();
      console.log('Not ok');
    };
  });
  ```


## Команды:

1. `yourname.init(userSettings)` - находит элемент формы, элемент кнопки, элементы полей и элементы с описанием ошибок по заданным настройкам.
2. `yourname.run()` - запускает валидацию формы.
3. `yourname.valid` - возвращает результат валидации, *boolean*.
4. `yourname.form` - возвращает элемент формы, *HTMLElement*.
5. `yourname.button` - возвращает элемент кнопки, *HTMLElement*.
6. `yourname.fields` - возвращает массив с элементами полей, *Array[HTMLElement]*.
7. `yourname.errors` - возвращает массив с элементами описания ошибки, *Array[HTMLElement]*.
8. `yourname.rules` - возвращает массив с функциями проверки, *Array[function]*.
9. `yourname.results` - возвращает массив с результатами проверки полей, *Array[boolean]*.
10. `yourname.test()` - выводит в консоль надпись "I'm working!".

## Настройки:

```
render: boolean,
form: {
    formselector: 'selector',
    buttonselector: 'selector'
},
ruleset: {
    'selector': function,
    'selector': function,
    'selector': function,
    ...
},
errors: {
    textselector: 'selector',
    textvisibilityclass: 'class',
    fielddecorateclass: 'class'
}
```

* render - нужно ли отображать элементы errors.
* form - данные необходимые чтобы найти форму, *object*.
  - formselector - селектор формы, *string*.
  - buttonselector - селектор кнопки, *string*.
* ruleset - набор селекторов полей и правил для валидации, *object*.
  - 'selector' - селектор поля, *string*.
  - function - функция проверки, *function*. **Должна возвращать *boolean*!**
* errors - данные необходимые для визуализации ошибок.
  - textselector - селектор полей с описанием ошибки, *string*.
  - textvisibilityclass - класс видимости поля с ошибкой, *string*.
  - fielddecorateclass - класс для оформления поля с ошибкой, *string*.

*Если render установлен в значении false задавать поле errors НЕ нужно*

## Пример использования:

```
function checkname(nameValue) {
    return Boolean(nameValue.match(/.+/))
};
function checkmail(mailValue) {
    return Boolean(mailValue.match(/\w{6,}/))
};
function checkcomment(commentValue) {
    return Boolean(commentValue.match(/.+/))
};


let userSettings = {
    render: true,
    form: {
        formselector: '.contact-form',
        buttonselector: '.submit-button'
    },
    ruleset: {
        '.name': checkname,
        '.mail': checkmail,
        '.comment': checkcomment,
    },
    errors: {
        textselector: '.error-text',
        textvisibilityclass: 'error-text__visible',
        fielddecorateclass: 'contact-form_field__error'
    }
};

const test = new SValid();
test.init(userSettings);
test.button.addEventListener('click', () => {
    test.run();
    if (test.valid) {
        console.log('ok')
    } else {
        console.log('Not ok')
    };
});
```

или

```
function checkname(nameValue) {
    return checkBoolean(nameValue.match(/.+/))
};
function checkmail(mailValue) {
    return Boolean(mailValue.match(/\w{6,}/))
};
function checkcomment(commentValue) {
    return Boolean(commentValue.match(/.+/))
};

dict = {
    '.name': checkname,
    '.mail': checkmail,
    '.comment': checkcomment,
};

let userSettings = {
    render: true,
    form: {
        formselector: '.contact-form',
        buttonselector: '.submit-button'
    },
    ruleset: dict,
    errors: {
        textselector: '.error-text',
        textvisibilityclass: 'error-text__visible',
        fielddecorateclass: 'contact-form_field__error'
    }
};

const test = new SValid();
test.init(userSettings);
test.button.addEventListener('click', () => {
    test.run();
    if (test.valid) {
        console.log('ok')
    } else {
        console.log('Not ok')
    };
});
```