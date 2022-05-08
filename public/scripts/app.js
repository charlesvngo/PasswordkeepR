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
    characters += "!@#$$%^&*()_+";
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
      $(".button-copy").click(function() {
        const copyField = $(this).prev().val();
        $(this).prev().val(copyField).select();
        document.execCommand("copy");
      });

      // Attach password generation click handler
      $(".button-generate-password").click(function() {
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

      // Attach handler to add-password button. Handler performs a post request
      $(".create-password-form").submit(function(event) {
        event.preventDefault();
        const $inputArray = $(":input", this);
        const $website = $inputArray[0];
        const $category = $inputArray[1];
        const $username = $inputArray[2];
        const $password = $inputArray[3];

        const website = $($website).val();
        const category = $($category).val();
        const username = $($username).val();
        const password = $($password).val();

        // Change the hardcoded org later
        const organization_id = 1;

        const data = {website, category, username, password};

        $.post("/api/passwords/",data)
          .then(() => {});

      });
    });
});
