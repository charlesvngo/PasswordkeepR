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
      const username = response.users[0].username;

      const $companyName = $('.company-name').text(companyName);
      $companyName.next().find("img").replaceWith(`<img src="${response.users[0].profile_picture}" alt="mdo" width="32" height="32" class="rounded-circle"></img>`);
      $companyName.next().find(".dropdown-menu").prepend(`<a class="dropdown-item">${username}</a>`);
    })

  $(".sort-by").click((event) => {
    event.preventDefault();
    let category = $(event.target).text();
    $("main").fadeToggle(400, "swing", function(event) {
      $(this).empty();
      if (category === "Show All") {
        $.get(`/api/passwords/`)
          .then((response) => {
            renderPasswordElement(response);
            $(this).fadeToggle(400, "swing");
          });
      } else {
        $.get(`/api/passwords/categories/${category}`)
          .then((response) => {
            renderPasswordElement(response);
            $(this).fadeToggle(400, "swing");
          });
      }
    });

  });

  $(".search-form").keyup((event) => {
    const searchItem = $(event.target).val();
    $("main").empty();

    if (!searchItem) {
      $.get(`/api/passwords/`)
      .then((response) => {
        renderPasswordElement(response);
      });
    } else {
      $.get(`/api/passwords/search/${searchItem}`)
        .then((response) => {
        renderPasswordElement(response);
      });
    }
  })

});
