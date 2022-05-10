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

  if(!website || !username || !password) {
    return alert("Please make sure all fields are filled in!");
  }

  $.get("/api/organizations")
    .then((response) => {
      const organization_id = response.organization_id[0].id;
      const data = {website, category, username, password, organization_id};

      $.post("/api/passwords/", data)
        .then((response) => {
          $(".create-password-modal").modal('hide');
          renderPasswordElement(response);
          $("html").animate({ scrollTop: 0 }, 400);
        });
    })
});

$(".website-input").on("focusout",function(event){
  const value = $(this).val()
  $(".website-photo").attr("src", `https://logo.clearbit.com/${value}?size=72`)
});
