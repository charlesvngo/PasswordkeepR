// Client facing scripts here

$(() => {
  // On initial load, render all the passwords in the database.
  $.get("/api/passwords/")
    .then((response) => renderPasswordElement(response))
    .then((response) => {
      // After the initial load, add the copy to clipboard handler to all cards.
      $(".button-copy").click(function(event) {

        const copyField = $(this).prev().val();
        $(this).prev().val(copyField).select();
        document.execCommand("copy");
      });
    });
});
