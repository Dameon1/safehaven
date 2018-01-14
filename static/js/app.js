//===============================================================================================
//getting data from the users from the website
var registerVolunteer = function () {
  var name = $("#vol-first-name").val().trim() + " " + $("#vol-last-name").val().trim()
  var email = $("#vol-email").val().trim()
  var phone = $("#vol-phone").val().trim()
  var password = $("#vol-password").val().trim()
  var region = $("#vol-region").val().trim()
  var availability = {
    monday: [$("#mon-morn").is(':checked') * 1, $("#mon-after").is(':checked') * 1],
    tuesday: [$("#tues-morn").is(':checked') * 1, $("#tues-after").is(':checked') * 1],
    wednesday: [$("#wed-morn").is(':checked') * 1, $("#wed-after").is(':checked') * 1],
    thursday: [$("#thurs-morn").is(':checked') * 1, $("#thurs-after").is(':checked') * 1],
	friday: [$("#fri-morn").is(':checked') * 1, $("#fri-after").is(':checked') * 1]
  }
  axios.post('/register', {
    name: name,
    email: email,
    phone: phone,
	password: password,
    region: region,
    availability: availability
  }).then(message => {
	$('#email-signon').val(email)
	$('#driverLoginPass').val(password)
	$('#driverLoginSubmit').click()
  })
}

var askForRide = function () {
  var region = $("#apl-address").val().trim()
  var email = $("#apl-email").val().trim()
  var date = $("#apl-date").val().trim()
  var clinic = $("#clinic-address").val().trim()
  var timeOfDay = $("#apl-time").val().trim()

  axios.post('/schedule', {
    email: email,
    region: region,
    date: date,
	clinic: clinic,
    timeOfDay: timeOfDay
  }).then(message => {
	 console.log(message)
  })
}

$("#submitApplicant").on("click", askForRide);

//add main page redirect for volunteers using  window.location.href
$("#volunteerSubmit").on("click", registerVolunteer);


// getting data from the users from the website
//====================================================================================
//validate info 


