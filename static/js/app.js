//===============================================================================================
//getting data from the users from the website
var registerVolunteer = function () {
  var name = $("#vol-first-name").val().trim() + " " + $("#vol-last-name").val().trim()
  var email = $("#vol-email").val().trim()
  var phone = $("#vol-phone").val().trim()
  var region = $("#vol-region").val().trim()
  var times = {
    monday: [$("#mon-morn").is(':checked'), $("#mon-after").is(':checked')],
    tuesday: [$("#tues-morn").is(':checked'), $("#tues-after").is(':checked')],
    wednesday: [$("#wed-morn").is(':checked'), $("#wed-after").is(':checked')],
    thursday: [$("#thurs-morn").is(':checked'), $("#thurs-after").is(':checked')],
    friday: [$("#fri-morn").is(':checked'), $("#fri-after").is(':checked')]
  }
  axios.post('/register/', {
    name: name,
    email: email,
    phone: phone,
    region: region,
    times: times
  }).then(fuck => console.log(fuck, 'you'))
}

var askForRide = function () {
  var region = $("#apl-address").val().trim()
  var email = $("#apl-email").val().trim()
  var date = $("#apl-date").val().trim()
  var timeOfDay = $("#apl-time").val().trim()

  axios.post('/register/', {
    email: email,
    region: region,
    date: date,
    timeOfDay: timeOfDay
  }).then(fuck => console.log(fuck, 'you'))
}

var driverLogin = function () {
  var email = $("#email-signon").val().trim()
  var password = $("#driverLoginPass").val().trim()

  axios.post('/register/', {
    email: email,
    password: password
  }).then(pottymouth => console.log(fuck, 'you'))
}


$("#submitApplicant").on("click", askForRide());

//add main page redirect for volunteers using  window.location.href
$("#volunteerSubmit").on("click", registerVolunteer());

$("#driverLoginSubmit").on("click", driverLogin());


// getting data from the users from the website
//====================================================================================
//validate info 


