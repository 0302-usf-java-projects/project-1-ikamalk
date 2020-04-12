saidWelcome();
var userData;
var jsonData;
getUserData();
getAllReimbursement();



function showTable(data) {
	console.log(data);
	    $('#myTableReimbursement').DataTable( {
	    	"data": data,
	    	"columns": [
	            { data: 'reimb_id' },
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
	            }
	        ]
	    } );
}

function saidWelcome() {
  new Typed("#navbar-title", {
    strings: ["", "Welcome to the FakeCompany !"],
    typeSpeed: 25,
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
  document.getElementById("user-id").innerHTML =(userData.role_id == 1 ? "Employee #" : "Manager #")+ userData.id;
}

function getAllReimbursement() {
	 var formData = new FormData();
	  formData.append("id", userData.id);
	  console.log(formData);
	  fetch("./reimbursement", {
	    method: "POST", // or 'PUT'
	    body: formData,
	  })
	    .then((response) => response.json())
	    .then((data) => {
	    	jsonData = data;
	    	document.getElementById("reimbersoument-container").style.display = "block";
	    	document.getElementById("please-wait").style.display = "none";
	    	showTable(data);
	    })
	    .catch((error) => {
	      console.error("Error:", error);
	    });
}
