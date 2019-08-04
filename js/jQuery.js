function animateKeyboard() {
  $('#qwerty button').hide();
  for (let i = 0; i < $('#qwerty button').length; i += 1) {
    let button = $('#qwerty button').get(i);
    $(button).fadeIn(i * 100);
  }
}
