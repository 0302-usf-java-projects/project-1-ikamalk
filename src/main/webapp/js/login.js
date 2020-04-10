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
var triangleWrongLogin = document.getElementById('triangle-top-right-wrong-login');
var tirangleSuccessLogin = document.getElementById('triangle-top-right-success-login');


function goToCreateAccount() {
    loginContainer.style.display = "none";
    RegisterContainer.style.display = "block"
}

function goToLogin() {
    loginContainer.style.display = "block";
    RegisterContainer.style.display = "none"
}



function login() {
  var loginUsername = document.getElementById('login-username').value;
  var loginPassword = document.getElementById('login-password').value;
   

    //ui waiting
    loginUsername.disabled = true;
    loginPassword.disabled = true;
    loginButton.disabled = true;
    loginButton.innerHTML = `<div class="spinner-container"><div class="spinner">
    <div></div><div><div></div></div>
    </div></div>`;





var formData = new FormData();
formData.append("username", loginUsername);
formData.append("password", loginPassword);

console.log(formData);

fetch('./login', {
  method: 'POST', // or 'PUT'
  body: formData,
})
.then((response) => response.json())
.then((data) => {
  if(data != null) {
    triangleWrongLogin.className = "smooth-hide";
    tirangleSuccessLogin.style.display = "block";
    tirangleSuccessLogin.className = "smooth-show";
    tirangleSuccessLogin.style.opacity = "0.9";
    writeSuccessLogin();
    setTimeout(() => {
        window.location.href = 'dashboard';
    }, 1500);
  } else {
           //  Wrong response
          triangleWrongLogin.style.display = "block";
          triangleWelcome.className = "smooth-hide";
          triangleWelcome.style.opacity = "0";
          writeWrongLogin();
          loginResponse = true;
          //let user to retry
          loginUsername.disabled = false;
          loginPassword.disabled = false;
          loginButton.disabled = false;
          loginButton.innerHTML = `Login`;
  }
})
.catch((error) => {
  console.error('Error:', error);
});
}

function login2() {
    //form login
  

    //emulate
    setTimeout(() => {
        //ui
        if(!loginResponse) {

        } else {

        }

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

function writeSuccessLogin() {
    var loginUsername = document.getElementById('login-username');
    new Typed('#triangle-text-success-login', {
        strings: ["", "Welcome "+loginUsername.value+" !"],
        typeSpeed: 30,
        showCursor: false
      });
}