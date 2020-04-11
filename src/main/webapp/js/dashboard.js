saidWelcome();



$(document).ready(function() {
    $('#myTableReimbursement').DataTable();
} );



























function saidWelcome() {
    new Typed('#navbar-title', {
        strings: ["", "Welcome to the FakeCompany !"],
        typeSpeed: 25,
        showCursor: false
      });

    }