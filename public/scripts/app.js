// Client facing scripts here

const generatePassword = (length, lowerCase, upperCase, num, symbol) => {
  let password = "";

  // create a key to pull values from
  let characters = "";

  if (length === 0) {
    return alert('please enter password length');
  }

  // add values to key based on flags set > 4 if statements
  if (lowerCase) {
    characters += 'abcdefghijklmnopqrstuvwxyz';
  }

  if (upperCase) {
    characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  if (num) {
    characters += "1234567890";
  }

  if (symbol) {
    characters += "!@3$$%^&*()_+";
  }

  // loop through the key based on the length provided, and add random values from the key
  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return password;
};

$(() => {
  // On initial load, render all the passwords in the database.
  $.get("/api/passwords/")
    .then((response) => renderPasswordElement(response))
    .then((response) => {
      // After the initial load, add the copy to clipboard handler to all cards.
      $(".button-copy").click(function(event) {
        const copyField = $(this).prev().val();
        $(this).prev().val(copyField).select();
        document.execCommand("copy");
      });
    });

  console.log(generatePassword(12, true, true, true, true));
  console.log(generatePassword(12, true, true, true, true));
  console.log(generatePassword(12, true, true, true, true));
  console.log(generatePassword(12, true, true, true, true));
  console.log(generatePassword(12, true, true, true, true));
});
