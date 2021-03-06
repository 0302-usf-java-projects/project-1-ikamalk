saidWelcome();
var userData;
var jsonData;
getUserData();
getAllReimbursement();
var tableIsEmpty = false;
var navbarText;
var table;

// Add reibursement form
var amountReimbursement = document.getElementById("amountReimbursement");
var typeReimbursement = document.getElementById("typeReimbursement");
var descriptionReimbursement = document.getElementById("descriptionReimbursement");
var fileReceipt = document.getElementById("fileReceipt");
// Add reibursement btn
var submitBtn = document.querySelector('.submitBtn');
var cancelBtn = document.querySelector('.cancelBtn');

function showTable(data) {
	console.log(data);
	table=  $('#myTableReimbursementRequest').DataTable( {
	    	"data": data,
	    	"order": [[ 0, "desc" ]],
	    	"columns": [
	            { data: 'reimb_id' },
	            {
	                "className":      'options',
	                "data":           'reimb_amount',
	                "render": function(data, type, full, meta){
	                	return data+" $";
	                }
	            },
	            {
	                "className":      'options',
	                "data":           'reimb_submitted',
	                "render": function(data, type, full, meta){
	                	return data.split(':')[0] +":"+data.split(':')[1];
	                }
	            },
	            { data: 'reimb_description' },
	            {
	                "className":      'options',
	                "data":           'reimb_type_id',
	                "render": function(data, type, full, meta){
	                	if(data == 1) {
	                		return "<button class='btn btn-warning' style='border-radius:20px !important'>Lodging</button>"
	                	} else if (data == 2) {
	                		return "<button class='btn btn-info' style='border-radius:20px !important'>Travel</button>"
	                	} else if (data ==3) {
	                		return "<button class='btn btn-success' style='border-radius:20px !important'>Food</button>"
	                	} else if (data ==4) {
	                		return "<button class='btn btn-secondary' style='border-radius:20px !important'>Other</button>"

	                	}
	                }
	            },
	            {
	                "className":      'options',
	                "data":           'reimb_status_id',
	                "render": function(data, type, full, meta){
	                	if(data == 1) {
		                   return '<button class="btn btn-warning btn-table" disabled data-toggle="tooltip" data-placement="top" title="Pending"> <i class="fas fa-clock"></i></button>';
	                	} else if (data == 2) {
			                   return '<button class="btn btn-success btn-table" data-toggle="tooltip" data-placement="top" title="Accepted" disabled><i class="fas fa-check"></i></button>';

	                	} else if (data ==3) {
			                   return '<button class="btn btn-danger btn-table" data-toggle="tooltip" data-placement="top" title="Rejected" disabled><i class="fas fa-times"></i></button>';

	                	}
	                }
	            }
	        ]
	    } );
}

function saidWelcome() {
  navbarText = new Typed("#navbar-title-welcome", {
    strings: ["", "Welcome to the FakeCompany !"],
    typeSpeed: 25,
    showCursor: false,
  });
  
}

function successReimbursementText() {
	console.log('success');
	document.getElementById("navbar-title-welcome").style.display = "none";
	document.getElementById("navbar-title-success-reimbursement").style.display = "block";
	navbarText=  new Typed("#navbar-title-success-reimbursement", {
	    strings: ["Your reimbursement request was added successfuly !"],
	    typeSpeed: 35,
	    showCursor: false,
	  });
	
	setTimeout(()=>{
		navbarText.destroy();
		var navbar = document.querySelector(".navbar");
    	navbar.classList.remove("anime_me");
	},4000)
	}

function getUserData() {
  userData = localStorage.getItem("userData");
  if(userData != null) {
	  userData = JSON.parse(userData);
	  console.log(userData);
	  setUserData();
  } else {
	  document.write("NOPE !");
  }

}

function setUserData() {
  //set username
  document.getElementById("first-name-last-name").innerHTML =
    userData.first_name + " " + userData.last_name;
  //set ID
  document.getElementById("user-id").innerHTML =(userData.role_id == 1 ? "Manager #" : "Employee #")+ userData.id;
}

function getAllReimbursement() {
	 var formData = new FormData();
	  formData.append("id", userData.id);
	  console.log(formData);
	  fetch("./reimbursement", {
	    method: "POST", 
	    body: formData,
	  })
	    .then((response) => response.json())
	    .then((data) => {
	    	setTimeout(()=>{ //emulate it
		    	jsonData = data;
		    	if(jsonData.length == 0) {
		    		tableIsEmpty = true;
			    	document.getElementById("please-wait").style.display = "none";
			    	document.getElementById("no-reibursement-container").style.display = "block";

		    	} else {
			    	document.getElementById("reimbersoument-container").style.display = "block";
			    	document.getElementById("please-wait").style.display = "none";
			    	showTable(data);
		    	}
	    	},1000);

	    })
	    .catch((error) => {
	      console.error("Error:", error);
	    });
}


function addReimbursement() {
	//UI loading
	submitBtn.disabled = true;
	cancelBtn.disabled = true;
	submitBtn.innerHTML = `<div class="spinner-container"><div class="spinner">
	    <div></div><div><div></div></div>
	    </div></div>`;
	
	//get all value


	//set value on formdata
	var data = new FormData()
	data.append('amountReimbursement', amountReimbursement.value);
	data.append('typeReimbursement', typeReimbursement.value);
	data.append('descriptionReimbursement', descriptionReimbursement.value);
	data.append('authorReimbursement',userData.username);
	data.append('fileReceipt', fileReceipt.files[0]); //

	


	fetch('./addReimbursement', {
	  method: 'POST',
	  body: data
	})
	 .then((response) => response)
	    .then((data) => {
	    	console.log(data);
	    	$('#addRequest').modal('hide');
	    	newReibursementInit();
	    })
	    .catch((error) => {
	      console.error("Error:", error);
	    });
}


function newReibursementInit() {
	//text success
	successReimbursementText();
	//clear all
	submitBtn.disabled = false;
	cancelBtn.disabled = false;
	submitBtn.innerHTML = "Submit";
	amountReimbursement.value = "";
	typeReimbursement.value = "";
	descriptionReimbursement.value = "";
	fileReceipt.value = "";
	//get new reimbursement list
	//first show please wait and hide the table
	document.getElementById("no-reibursement-container").style.display = "none";
	document.getElementById("reimbersoument-container").style.display = "none";
	document.getElementById("please-wait").style.display = "block";
	// updateReibursement
	updateReibursement();
}

function updateReibursement() {
	 var formData = new FormData();
	  formData.append("id", userData.id);
	  console.log(formData);
	  fetch("./reimbursement", {
	    method: "POST", 
	    body: formData,
	  })
	    .then((response) => response.json())
	    .then((data) => {
	    	jsonData = data;
	    	document.getElementById("reimbersoument-container").style.display = "block";
	    	document.getElementById("please-wait").style.display = "none";
	    	var navbar = document.querySelector(".navbar");
	    	navbar.classList.add("anime_me");
	    	if(!tableIsEmpty){
		    $('#myTableReimbursement').dataTable().fnClearTable();
	    	$('#myTableReimbursement').dataTable().fnAddData(data);
	    	} else {
		    	showTable(data);
	    	}
	    	tableIsEmpty = false;
	    })
	    .catch((error) => {
	      console.error("Error:", error);
	    });
}

function logout() {
	table.destroy();
    window.location.href = "./";
    userData = {};
}