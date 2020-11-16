class SValid {
  constructor() {
    this._settings = {};
    this._formElem = null;
    this._buttonElem = null;
    this._fieldElems = [];
    this._errorElems = [];
    this._rules = [];
    this._results = [];
    this._result = null;
  }

  init(userSettings) {
    if (!this._checkSettings(userSettings)) return;
    Object.assign(this._settings, userSettings);
    this._init();
  }

  _checkSettings(settings) {
    try {
      if (!settings) throw new Error('SValid: Задайте настройки!');

      if (!Object.keys(settings).includes('render')) {
        throw new Error("SValid: В настройках нет опции 'render'!");
      }
      if (typeof (settings.render) !== 'boolean') {
        throw new Error("SValid: В настройках значение 'render' не соответствует 'boolean'!");
      }

      if (settings.render === true) {
        if (Object.keys(settings).length > 4) {
          throw new Error('SValid: В настройках что то лишнее!');
        }
        if (!Object.keys(settings).includes('errors')) {
          throw new Error("SValid: В настройках нет опции 'errors'!");
        }
        if (Object.keys(settings.errors).length > 3) {
          throw new Error("SValid: В настройках у опции 'errors' что то лишнее!");
        }

        if (!Object.keys(settings.errors).includes('textselector')) {
          throw new Error("SValid: В настройках у опции 'errors' не задан 'textselector'!");
        }
        if (settings.errors.textselector === '') {
          throw Error("SValid: В настройках у опции 'errors' значение 'textselector' не может быть пустым");
        }
        if (typeof (settings.errors.textselector) !== 'string') {
          throw new Error("SValid: В настройках у опции 'errors' значение 'textselector' не соответствует 'string''!");
        }

        if (!Object.keys(settings.errors).includes('textvisibilityclass')) {
          throw new Error("SValid: В настройках у опции 'errors' не задан 'textvisibilityclass'!");
        }
        if (settings.errors.textvisibilityclass === '') {
          throw Error("SValid: В настройках у опции 'errors' значение 'textvisibilityclass' не может быть пустым");
        }
        if (typeof (settings.errors.textvisibilityclass) !== 'string') {
          throw new Error("SValid: В настройках у опции 'errors' значение 'textvisibilityclass' не соответствует 'string''!");
        }

        if (!Object.keys(settings.errors).includes('fielddecorateclass')) {
          throw new Error("SValid: В настройках у опции 'errors' не задан 'fielddecorateclass'!");
        }
        if (settings.errors.fielddecorateclass === '') {
          throw Error("SValid: В настройках у опции 'errors' значение 'fielddecorateclass' не может быть пустым");
        }
        if (typeof (settings.errors.fielddecorateclass) !== 'string') {
          throw new Error("SValid: В настройках у опции 'errors' значение 'fielddecorateclass' не соответствует 'string''!");
        }
      } else if (Object.keys(settings).length > 3) throw new Error("SValid: В настройках что то лишнее! Проверьте отсуствие опции 'errors' при 'render' со значением 'false'");

      if (!Object.keys(settings).includes('form')) throw new Error("SValid: В настройках нет опции 'form'!");
      if (Object.keys(settings.form).length > 2) throw new Error("SValid: В настройках у опции 'form' что то лишнее!");
      if (!Object.keys(settings.form).includes('formselector')) {
        throw new Error("SValid: В настройках у опции 'form' не задан 'formselector'!");
      }
      if (settings.form.formselector === '') {
        throw Error("SValid: В настройках у опции 'errors' значение 'formselector' не может быть пустым");
      }

      if (typeof (settings.form.formselector) !== 'string') {
        throw new Error("SValid: В настройках у опции 'form' значение 'formselector' не соответствует 'string''!");
      }
      if (!Object.keys(settings.form).includes('buttonselector')) {
        throw new Error("SValid: В настройках у опции 'form' не задан 'buttonselector'!");
      }
      if (settings.form.buttonselector === '') {
        throw Error("SValid: В настройках у опции 'errors' значение 'buttonselector' не может быть пустым");
      }
      if (typeof (settings.form.buttonselector) !== 'string') {
        throw new Error("SValid: В настройках у опции 'form' значение 'buttonselector' не соответствует 'string''!");
      }

      if (!Object.keys(settings).includes('ruleset')) throw new Error("SValid: В настройках нет опции 'ruleset'!");
      if (Object.keys(settings.ruleset).length < 1) throw new Error("SValid: В настройках у опции 'ruleset' не задано значение!");

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  _init() {
    const {
      render, form, ruleset, errors,
    } = this._settings;

    this._formElem = document.querySelector(form.formselector);
    this._buttonElem = this._formElem.querySelector(form.buttonselector);

    const fieldClasses = [...Object.keys(ruleset)];
    for (const fieldClass of fieldClasses) {
      this._fieldElems.push(this._formElem.querySelector(fieldClass));
    }
    const rules = [...Object.values(ruleset)];
    for (const rule of rules) {
      this._rules.push(rule);
    }

    if (render === true) {
      this._errorElems = [...this._formElem.querySelectorAll(errors.textselector)];
    }
  }

  run() {
    this._validation();
    if (this._settings.render) this._render();
  }

  _validation() {
    const results = [];
    for (let i = 0; i < this._fieldElems.length; i++) {
      const result = this._rules[i](this._fieldElems[i].value);
      results.push(result);
    }
    this._results = [...results];

    results.includes(false) ? this._result = false : this._result = true;
  }

  _render() {
    for (let i = 0; i < this._fieldElems.length; i++) {
      if (this._results[i] !== true) {
        this._fieldElems[i].classList.add(this._settings.errors.fielddecorateclass);
        this._errorElems[i].classList.add(this._settings.errors.textvisibilityclass);
      } else {
        this._fieldElems[i].classList.remove(this._settings.errors.fielddecorateclass);
        this._errorElems[i].classList.remove(this._settings.errors.textvisibilityclass);
      }
    }
  }

  get valid() {
    return this._result;
  }

  get form() {
    return this._formElem;
  }

  get button() {
    return this._buttonElem;
  }

  get fields() {
    return this._fieldElems;
  }

  get errors() {
    return this._errorElems;
  }

  get rules() {
    return this._rules;
  }

  get results() {
    return this._results;
  }

  test() {
    console.log("I'm working!");
  }
}
