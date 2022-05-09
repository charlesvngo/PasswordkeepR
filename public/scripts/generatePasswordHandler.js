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
  const $symbol = $($num).parent().next().children("input");
  const symbol = $symbol.is(':checked');

  const $inputField = $(this).prev().children("input");
  $inputField.val(generatePassword(length, lowerCase, upperCase, num, symbol));
});


