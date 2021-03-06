$(document).ready(function () {
  // Getting references to our form and inputs
  var loginForm = $("#loginForm");
  var emailInput = $("#login-email");
  var passwordInput = $("#login-pwd");

  // When the form is submitted, we validate there's an email and password entered
  $("#loginForm").on("submit", function (event) {
    event.preventDefault();
    console.log("Here");
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function (data) {
        console.log("Did we did it?", data)
        localStorage.setItem("user-id", data.id);
        window.location = (`/profile/${data.id}`); //like this?
        // If there's an error, log the error
      })
      .catch(function (err) {
        console.log(err);
      });
  }
});
