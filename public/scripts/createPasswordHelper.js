// Attach handler to add-password button. Handler performs a post request

const createPasswordHelper = $(".create-password-form").submit(function(event) {
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

  // Can we add an organization_id?
  const data = {website, category, username, password};

  $.post("/api/passwords/", data)
    .then((response) => {
      $(".create-password-modal").modal('hide');
      renderPasswordElement(response);
      $("html").animate({ scrollTop: 0 }, 400);
    });
});
