// Edit submit form handler
const editPasswordHelper = $(".edit-password-form").submit(function(event){
  event.preventDefault();
  const $inputArray = $(":input", this);
  const $website = $inputArray[0];
  const $category = $inputArray[1];
  const $username = $inputArray[2];
  const $password = $inputArray[3];
  const $id = $inputArray[11];

  const website = $($website).val();
  const category = $($category).val();
  const username = $($username).val();
  const password = $($password).val();
  const id = $($id).val();

  const data = {website, category, username, password, id};

  $.post("/api/passwords/edit", data)
    .then((response) => {
      $(".edit-password-modal").modal('hide');
      $(`#${response.passwords[0].id}`).closest("article").remove();
      renderPasswordElement(response);
      $("html").animate({ scrollTop: 0 }, 400);
    });
});

$(".website-input").on("focusout",function(event){
  const value = $(this).val()
  $(".website-photo").attr("src", `https://logo.clearbit.com/${value}?size=72`)
});

