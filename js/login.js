
var loginContainer = document.getElementById("login-container");
var RegisterContainer = document.getElementById("register-container");


function goToCreateAccount() {
    loginContainer.style.display = "none";
    RegisterContainer.style.display = "block"
}

function goToLogin() {
    loginContainer.style.display = "block";
    RegisterContainer.style.display = "none"

}