//am pm
var registerVolunteer = function () {
  var name = $("#vol-name")
  var email = $("#vol-email")
  var phone = $("#vol-phone")
  var times = {
    sunday: [$("#sun-morn"), $("#sun-after")],
    monday: [$("#mon-morn"), $("#mon-after")],
    tuesday: [$("#tues-morn"), $("#tues-after")],
    wednesday: [$("#wed-morn"), $("#wed-after")],
    thursday: [$("#thurs-morn"), $("#thurs-after")],
    friday: [$("#fri-morn"), $("#fri-after")],
    saturday: [$("#sat-morn"), $("#sat-after")]
  }
  return {
    name: name,
    email: email,
    phone: phone,
    times: times
  }
}