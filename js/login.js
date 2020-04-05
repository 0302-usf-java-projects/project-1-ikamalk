saidWelcome();


//emulation
var loginResponse = false;

//Root
let root = document.documentElement;


//Containers
var loginContainer = document.getElementById("login-container");
var RegisterContainer = document.getElementById("register-container");

//submit btn
var loginButton = document.getElementById("login-submit-btn");
var registerButton = document.getElementById("register-submit-btn");

// triangle
var triangleWelcome = document.getElementById('triangle-top-right');
var triangleWrongPassword = document.getElementById('triangle-top-right-wrong-login');



function goToCreateAccount() {
    loginContainer.style.display = "none";
    RegisterContainer.style.display = "block"
}

function goToLogin() {
    loginContainer.style.display = "block";
    RegisterContainer.style.display = "none"

}

function login() {
    //form login
    var loginUsername = document.getElementById('login-username');
    var loginPassword = document.getElementById('login-password');

    //ui
    loginUsername.disabled = true;
    loginPassword.disabled = true;
    loginButton.disabled = true;
    loginButton.innerHTML = `<div class="spinner-container"><div class="spinner">
    <div></div><div><div></div></div>
    </div></div>`;

    //emulate
    setTimeout(() => {
        //ui
        if(!loginResponse) {
            //Wrong response
            triangleWrongPassword.style.display = "block";
            triangleWelcome.className = "smooth-hide";
            triangleWelcome.style.opacity = "0";
            writeWrongLogin();
        }
        loginUsername.disabled = false;
        loginPassword.disabled = false;
        loginButton.disabled = false;
    loginButton.innerHTML = `Login`;
    }, 2000);
}

function register() {
    //form register
    var registerUsername = document.getElementById("register-username");
    var registerPassword = document.getElementById("register-password");
    var registerFirstName = document.getElementById("register-first-name");
    var registerLastName = document.getElementById("register-last-name");
    var registerEmail = document.getElementById("register-email");

     //ui
     registerUsername.disabled = true;
     registerPassword.disabled = true;
     registerFirstName.disabled = true;
     registerLastName.disabled = true;
     registerEmail.disabled = true;
     registerButton.disabled = true;
     registerButton.innerHTML = `<div class="spinner-container"><div class="spinner">
     <div></div><div><div></div></div>
     </div></div>`;
 
     //emulate
     setTimeout(() => {
         //ui
         registerUsername.disabled = false;
         registerPassword.disabled = false;
         registerFirstName.disabled = false;
         registerLastName.disabled = false;
         registerEmail.disabled = false;
         registerButton.disabled = false;
         registerButton.innerHTML = `Register`;
     }, 2000);
}

function saidWelcome() {
new Typed('#triangle-text', {
    strings: ["", "^500 Welcome to the FakeCompany !"],
    typeSpeed: 50,
    showCursor: false
  });
//""
new Typed('#triangle-text-description', {
    strings: ["", "^2000 The best fake company in the world !"],
    typeSpeed: 50,
    showCursor: false
  });
}

function writeWrongLogin() {
    new Typed('#triangle-text-wrong-login', {
        strings: ["", "Incorrect username or password"],
        typeSpeed: 30,
        showCursor: false
      });
    //""
    new Typed('#triangle-text-description-wrong-login', {
        strings: ["", "^1000 Please verify your username and password !"],
        typeSpeed: 30,
        showCursor: false
      });
}