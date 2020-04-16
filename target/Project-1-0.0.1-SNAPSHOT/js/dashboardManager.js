saidWelcome();
var userData;
var jsonData;
getUserData();
getAllReimbursement();
var tableIsEmpty = false;
var navbarText;
var requestSelected;


// Add reibursement form
var amountReimbursement = document.getElementById("amountReimbursement");
var typeReimbursement = document.getElementById("typeReimbursement");
var descriptionReimbursement = document.getElementById("descriptionReimbursement");
var fileReceipt = document.getElementById("fileReceipt");
// Add reibursement btn
var approveBtn = document.querySelector('.approveBtn');
var rejectBtn = document.querySelector('.rejectBtn');
var cancelBtn = document.querySelector('.cancelBtn');

function showTable(data) {
	console.log(data);
	    $('#myTableReimbursement').DataTable( {
	    	"data": data,
	    	"columns": [
	            { data: 'reimb_id' },
	            { data: 'reimb_author'},
	            { data: 'reimb_amount' },
	            { data: 'reimb_submitted' },
	            { data: 'reimb_description' },
	            { data: 'reimb_receipt' },
	            { data: 'reimb_type_id' },
	            {
	                "className":      'options',
	                "data":           'reimb_status_id',
	                "render": function(data, type, full, meta){
	                	if(data == 1) {
		                   return '<button class="btn btn-warning btn-table" disabled data-toggle="tooltip" data-placement="top" title="Tooltip on top"> <i class="fas fa-clock"></i></button>';
	                	} else if (data == 2) {
			                   return '<button class="btn btn-success btn-table" data-toggle="tooltip" data-placement="top" title="Tooltip on top" disabled><i class="fas fa-check"></i></button>';

	                	} else if (data ==3) {
			                   return '<button class="btn btn-danger btn-table" data-toggle="tooltip" data-placement="top" title="Tooltip on top" disabled><i class="fas fa-times"></i></button>';

	                	}
	                }
	            },
	            {
	            	 "className":      'options',
		                "data":           data,
		                "render": function(data, type, full, meta){
				                   return "<button class='btn btn-primary' onclick='showRequest("+meta.row+")' style='border-radius:20px !important'><i class='fas fa-edit' ></i></button>";
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
	}

function getUserData() {
  userData = localStorage.getItem("userData");
  userData = JSON.parse(userData);
  console.log(userData);
  setUserData();
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


function sendDecisionReimbursement(reimb_id,status) {
	//UI loading
	approveBtn.disabled = true;
	rejectBtn.disabled = true;
	cancelBtn.disabled = true;
	if(status == 2){
		approveBtn.innerHTML = `<div class="spinner-container"><div class="spinner">
		    <div></div><div><div></div></div>
		    </div></div>`;
	} else {
		rejectBtn.innerHTML = `<div class="spinner-container"><div class="spinner">
		    <div></div><div><div></div></div>
		    </div></div>`;
	}

	
	//get all value


	//set value on formdata
	var data = new FormData()
	data.append('reimb_id',reimb_id);
	data.append('new_status_reimb',status);

	


	fetch('./decisionReimbursement', {
	  method: 'POST',
	  body: data
	})
	 .then((response) => response)
	    .then((data) => {
	    	console.log(data);
	    	$('#showRequest').modal('hide');
	    	newReibursementInit(reimb_id,status);
	    })
	    .catch((error) => {
	      console.error("Error:", error);
	    });
}


function newReibursementInit(reimb_id,status) {
	//text success
	successReimbursementText();
	//clear all
	approveBtn.disabled = false;
	rejectBtn.disabled = false;
	cancelBtn.disabled = false;
	
	//get new reimbursement list
	//first show please wait and hide the table
	document.getElementById("no-reibursement-container").style.display = "none";
	document.getElementById("reimbersoument-container").style.display = "none";
	document.getElementById("please-wait").style.display = "block";
	// updateReibursement
	updateReibursement();
}



function showRequest(index) {
	$('#showRequest').modal('show');
	console.log(jsonData[index]);
	document.getElementById("amountReimbursement").value = jsonData[index].reimb_amount;
	document.getElementById("typeReimbursement").value = jsonData[index].reimb_type_id;
	document.getElementById("descriptionReimbursement").value = jsonData[index].reimb_description;
	document.querySelector('.approveBtn').setAttribute('onclick',"sendDecisionReimbursement("+jsonData[index].reimb_id+",2)");
	document.querySelector('.rejectBtn').setAttribute('onclick',"sendDecisionReimbursement("+jsonData[index].reimb_id+",3)");


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
    window.location.href = "./";
    userData = {};
}