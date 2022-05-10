// Client facing scripts here


$(() => {
  // On initial load, render all the passwords in the database.
  $.get("/api/passwords/")
    .then((response) => renderPasswordElement(response))
    .then((response) => {

      // Attach gen-password button to add/edit modals
      generatePasswordHandler;

      // Attach handler to add-password button. Handler performs a post request
      createPasswordHelper;

      // Edit submit form handler
      editPasswordHelper;
    });

  $.get("/api/users/")
    .then((response) => {
      const companyName = response.users[0].name;
      $('.company-name').text(companyName);
    })

  $(".sort-by").click((event) => {
    event.preventDefault();
    let category = $(event.target).text()
    $("main").empty();

    if (category === "Show All") {
      $.get(`/api/passwords/`)
        .then((response) => {
          renderPasswordElement(response);
        });
    } else {
      $.get(`/api/passwords/categories/${category}`)
        .then((response) => {
          renderPasswordElement(response);
        });
    }
  });
});
