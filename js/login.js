
//Containers
var loginContainer = document.getElementById("login-container");
var RegisterContainer = document.getElementById("register-container");

//submit btn
var loginButton = document.getElementById("login-submit-btn");
var registerButton = document.getElementById("register-submit-btn");


function goToCreateAccount() {
    loginContainer.style.display = "none";
    RegisterContainer.style.display = "block"
}

function goToLogin() {
    loginContainer.style.display = "block";
    RegisterContainer.style.display = "none"

}

function login() {
    //ui
    loginButton.disabled = true;
    loginButton.innerHTML = `<div class="spinner-container"><div class="spinner">
    <div></div><div><div></div></div>
    </div></div>`;

    //emulate
    setTimeout(() => {
        //ui
        loginButton.disabled = false;
    loginButton.innerHTML = `Login`;
    }, 2000);
}

function register() {
     //ui
     registerButton.disabled = true;
     registerButton.innerHTML = `<div class="spinner-container"><div class="spinner">
     <div></div><div><div></div></div>
     </div></div>`;
 
     //emulate
     setTimeout(() => {
         //ui
         registerButton.disabled = false;
         registerButton.innerHTML = `Register`;
     }, 2000);
}