function name(nameValue) {
  return Boolean(nameValue.match(/.+/));
}
function mail(mailValue) {
  return Boolean(mailValue.match(/\w{6,}/));
}
function comment(commentValue) {
  return Boolean(commentValue.match(/.+/));
}

const userSettings = {
  render: true,
  form: {
    formselector: '.contact-form',
    buttonselector: '.submit-button',
  },
  ruleset: {
    '.name': name,
    '.mail': mail,
    '.comment': comment,
  },
  errors: {
    textselector: '.error-text',
    textvisibilityclass: 'error-text__visible',
    fielddecorateclass: 'contact-form_field__error',
  },
};

const test = new SValid();
test.init(userSettings);
test.button.addEventListener('click', (e) => {
  test.run();
  if (test.valid) {
    alert('ok');
  } else {
    e.preventDefault();
    console.log('Not ok');
  }
});
