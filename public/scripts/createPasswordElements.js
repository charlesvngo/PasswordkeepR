
// Function to create password cards from the database.
const createPasswordElement = function(password) {
  return `<article class="card p-1 shadow-lg rounded mb-5 mt-3 col-lg-8">
  <div class="card-body">
    <div class="d-flex justify-content-between align-items-center mb-2">
      <div class="d-flex align-items-center">
        <img class="website-image" src="https://logo.clearbit.com/${password.website_url}?"/>
        <h5 class="card-title ml-3">${password.website_url}</h5>
      </div>
      <div class="d-flex align-items-center ml-5">
        <h6 class="card-subtitle text-muted pb-1">${password.category}</h6>
      </div>
    </div>
    <div class="hidden-content">
        <div class="form-group row">
          <div class="col-lg-12 d-flex pt-2">
            <input type="text" readonly class="form-control-plaintext" value="${password.username}">
            <button type="button" class="button-copy btn btn-outline-primary d-flex align-items-center"><i class="fa-solid fa-copy mr-2"></i> Copy</button>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-lg-12 d-flex">
            <input type="text" readonly class="form-control-plaintext" value="${password.password}">
            <button type="button" class="button-copy btn btn-outline-primary d-flex align-items-center"><i class="fa-solid fa-copy mr-2"></i> Copy</button>
        </div>
        </div>
      <div class="d-flex justify-content-between">
        <button type="button" class="password-edit-button btn btn-outline-dark col-lg-6 col-sm-6 mr-1" data-toggle="modal" data-target=".bd-edit-modal-lg"> Edit</button>
        <button type="button" class="password-delete-button btn btn-outline-danger col-lg-6 col-sm-6"><i class="fa-solid fa-trash"></i> Delete</button>
      </div>
      <input type="hidden" id="${password.id}" class="password-id" value=${password.id}>
    </div>
  </div>
</article>`;
};

const renderPasswordElement = function(response) {
  for (const password of response.passwords) {
    const main = $("main").prepend(createPasswordElement(password));
    const card = $(main).children(":first-child")

    // Attach copy to clipboard to button on card creation
    $(".button-copy", card).click(function() {
      const copyField = $(this).prev().val();
      $(this).prev().val(copyField).select();
      document.execCommand("copy");
    });

    // Attach handler delete button. Handler performs a post request which deletes
    $(".password-delete-button", card).click(function(event) {
      const $id = $(this).parent().next();
      const id = $id.val();
      const data = {id};

      $.post("/api/passwords/delete", data)
        .then((response) => {
          $(this).closest("article").remove();
        });
    });

    $(".password-edit-button", card).click(function(event) {
      const $id = $(this).parent().next();
      const id = $id.val();


      $.get(`/api/passwords/${id}`)
        .then((result) =>{
          const passwordObj = result.passwords[0];
          const id = passwordObj.id
          const category = passwordObj.category;
          const username = passwordObj.username;
          const password = passwordObj.password;
          const website = passwordObj.website_url;

          $modal = $(this).closest("body").find(".edit-password-modal")

          $modal.find("input").first().val(website);
          $modal.find("input").filter(".username").val(username);
          $modal.find("input").filter(".password").val(password);
          $modal.find("input").filter(".password-id").val(id);
          $modal.find(":selected").text(category);
          $(".website-photo").attr("src", `https://logo.clearbit.com/${website}`)
        })
    });

    $(".website-image", card).click(function(event) {
      $(".hidden-content", card).slideToggle();
    })
  }
};


