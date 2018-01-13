//===============================================================================================
//getting data from the users from the website
var registerVolunteer = function () {
  var name = $("#vol-name")
  var email = $("#vol-email")
  var phone = $("#vol-phone")
  var region = $("#vol-region")
  var times = {
    monday: [$("#mon-morn"), $("#mon-after")],
    tuesday: [$("#tues-morn"), $("#tues-after")],
    wednesday: [$("#wed-morn"), $("#wed-after")],
    thursday: [$("#thurs-morn"), $("#thurs-after")],
    friday: [$("#fri-morn"), $("#fri-after")]
    //Not avaliale on weekends
    // saturday: [$("#sat-morn"), $("#sat-after")],
    // sunday: [$("#sun-morn"), $("#sun-after")]
  }
  return {
    name: name,
    email: email,
    phone: phone,
    region: region,
    times: times
  }
}

var askForRide = function () {
  var region = $("#apl-region")
  var email = $("#apl-email")
  var date = $("#apl-date")
  var timeOfDay = $("#apl-time")

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
