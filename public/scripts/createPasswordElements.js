
// Function to create password cards from the database.

const createPasswordElement = function(password) {
  return `<article class="card p-1 shadow-lg rounded mb-5 mt-3 col-lg-8">
  <div class="card-body">
    <div class="d-flex align-items-center">
      <h5 class="card-title">${password.website_url}</h5>
      <h6 class="card-subtitle text-muted ml-3 pb-1">${password.category}</h6>
    </div>
    <div class="form-group row">
      <div class="col-lg-6 d-flex pt-2">
        <input type="text" readonly class="form-control-plaintext" value="${password.username}">
        <button type="button" class="button-copy btn btn-outline-primary d-flex align-items-center"><i class="fa-solid fa-copy mr-2"></i> Copy</button>
      </div>
    </div>
    <div class="form-group row">
      <div class="col-lg-6 d-flex">
        <input type="text" readonly class="form-control-plaintext" value="${password.password}">
        <button type="button" class="button-copy btn btn-outline-primary d-flex align-items-center"><i class="fa-solid fa-copy mr-2"></i> Copy</button>
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <button type="button" class="password-edit-button btn btn-outline-dark col-lg-2 col-sm-6 mr-1" data-toggle="modal" data-target=".bd-edit-modal-lg"> Edit</button>
      <button type="button" class="password-delete-button btn btn-outline-danger col-lg-2 col-sm-6"><i class="fa-solid fa-trash"></i> Delete</button>
    </div>
    <input type="hidden" class="password-id" value=${password.id}>
  </div>
</article>`;
};

const renderPasswordElement = function(response) {
  for (const password of response.passwords) {
    $("main").prepend(createPasswordElement(password));
  }
};
