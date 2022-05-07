// Client facing scripts here

// On initial load, render all the passwords in the database.
$(() => {
  $.get("/api/passwords/")
    .then((response) => renderPasswordElement(response));
});
