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
  }).then(function (response) { console.log('ok')})
}

var askForRide = function () {
  var region = $("#apl-address").val().trim()
  var email = $("#apl-email").val().trim()
  var date = $("#apl-date").val().trim()
  var timeOfDay = $("#apl-time").val().trim()

  return {
    email: email,
    region: region,
    date: date,
    timeOfDay: timeOfDay
  }
}

// getting data from the users from the website
//====================================================================================
//validate info 
