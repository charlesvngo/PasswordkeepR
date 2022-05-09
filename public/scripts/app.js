// Client facing scripts here


$(() => {
  // On initial load, render all the passwords in the database.
  $.get("/api/passwords/")
    .then((response) => renderPasswordElement(response))
    .then((response) => {

      // Attach gen-password button to add/edit modals
      generatePasswordHandler;

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

        const data = {website, category, username, password};

        $.post("/api/passwords/", data)
          .then((response) => {
            $(".create-password-modal").modal('hide');
            renderPasswordElement(response);
            $("html").animate({ scrollTop: 0 }, 400);
          });
      });

      // Attach handler for edit button. Auto fill information in edit field.
      $(".password-edit-button").click(function(event) {
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

          })
      });

      $(".edit-password-form").submit(function(event){
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
    });
});
