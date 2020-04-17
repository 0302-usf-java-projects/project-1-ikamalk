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
	    	"order": [[ 0, "desc" ]],
	    	"columns": [
	    		 {
		                "className":      'options',
		                "data":           'reimb_amount',
		                "render": function(data, type, full, meta){
		                	return data+" $";
		                }
		            },
	            { data: 'reimb_author'},
	            { data: 'reimb_amount' },
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
	var navbar = document.querySelector(".navbar");
	navbar.classList.add("anime_me_success");
	console.log('success');
	document.getElementById("navbar-title-welcome").style.display = "none";
	document.getElementById("navbar-title-success-reimbursement").style.display = "block";
	navbarText=  new Typed("#navbar-title-success-reimbursement", {
	    strings: ["The reimbursement request was approved ! ^3000"],
	    typeSpeed: 35,
	    showCursor: false,
	  });
	setTimeout(()=>{
		navbarText.destroy();
	var navbar_text=document.querySelector(".navbar");
	navbar_text.classList.remove("anime_me_success")
	},4000)
	}



function failureReimbursementText() {
	var navbar = document.querySelector(".navbar");
	navbar.classList.add("anime_me_failure");
	document.getElementById("navbar-title-welcome").style.display = "none";
	document.getElementById("navbar-title-success-reimbursement").style.display = "block";
	navbarText=  new Typed("#navbar-title-success-reimbursement", {
	    strings: ["The reimbursement request was rejected !"],
	    typeSpeed: 35,
	    showCursor: false,
	  });
	setTimeout(()=>{
		navbarText.destroy();
	var navbar_text=document.querySelector(".navbar");
	navbar_text.classList.remove("anime_me_failure")
	},4000)
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
	    	setTimeout(()=>{ //emulate
		    	console.log(data);
		    	$('#showRequest').modal('hide');
		    	if(status == 2) {
		    		//text success
		    		successReimbursementText();
		    	} else if (status == 3) {
		    		failureReimbursementText();
		    	}
		    	newReibursementInit();
	    	},1000)

	    })
	    .catch((error) => {
	      console.error("Error:", error);
	    });
}

function hideRequest() {
	$('#showRequest').modal('hide');
}


function newReibursementInit() {
	
	//clear all
	approveBtn.disabled = false;
	rejectBtn.disabled = false;
	cancelBtn.disabled = false;
	approveBtn.innerHTML = "Approve";
	rejectBtn.innerHTML = "Reject";

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
	getReceipt(jsonData[index].reimb_id);

}

function getReceipt(reimb_id) {
	 var formData = new FormData();
	  formData.append("reimb_id", reimb_id);
	  console.log(formData);
	  fetch("./getReceipt", {
	    method: "POST", 
	    body: formData,
	  })
	    .then((response) => response.json())
	    .then((data) => {
		    console.log(data);
	    if(data != null) {
	        var stringBase64 =  _arrayBufferToBase64(data);
		    document.getElementById("reimb_receipt").src = "data:image/png;base64," +stringBase64;
		    document.getElementById("linkReceipt").setAttribute("href","data:image/png;base64," + stringBase64);
	    }
	
	    })
	    .catch((error) => {
	      console.error("Error:", error);
	    });
}

function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
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