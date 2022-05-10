// Attach password generation click handler
const generatePasswordHandler = $(".button-generate-password").click(function() {
  // Obtain the selected length.
  const $length = $(this).next().find("input");
  const length = $length.val();

  // From the DOM location of the length, check if lowerCase is true
  const $lowerCase = $($length).next().children("input");
  const lowerCase = $lowerCase.is(':checked');

  // From the DOM location of the lowerCase, check if upperCase is true
  const $upperCase = $($lowerCase).parent().next().children("input");
  const upperCase = $upperCase.is(':checked');

  // From the DOM location of the upperCase, check if num is true
  const $num = $($upperCase).parent().next().children("input");
  const num = $num.is(':checked');

  // From the DOM location of the num, check if symbol is true
  const $symbol = $($num);
  const symbol = $symbol.is(':checked');

  const $createPasswordForm = $(this).parent().children()[1];
  const $inputContainer = $($createPasswordForm).children().closest(".input-container").children()[2];
  const $passwordInput = $($inputContainer).children()

  $passwordInput.val(generatePassword(length, lowerCase, upperCase, num, symbol));
});


