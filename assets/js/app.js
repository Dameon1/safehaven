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
  return {
    name: name,
    email: email,
    phone: phone,
    region: region,
    times: times
  }
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



//Initialize Map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: { lat: 32.2350428, lng: -110.9547842 }
  });

  addMarker(32.2350428, -110.9547842, 'U of A');
  $("#galleryName").text("");
  $("#galleryAddr").text("");
};

//Resets the map to the entire United States
function resetMap() {
  map = new google.maps.Map(document.getElementById('map'), {
      zoom: 3,
      center: { lat: 37.50, lng: -95.35 }
  });
  
  $("#galleryName").text("");
  $("#galleryAddr").text("");
};

//Add marker function for Google maps
function addMarker(locLat, locLng, locTitle) {
  var marker = new google.maps.Marker({
      position: new google.maps.LatLng(locLat, locLng),
      title: locTitle,
      map: map
  });
};

//Renders the map based off the string of a location
function displayMap(LocationString) {
  // Get the latitude and longitude of the Address from the Address String passes in.
  $.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + LocationString + "&key=AIzaSyCSCJJqp5sR0Q6TMspPZ_SeqnTC7iLPnmE")
      .done(function (data) {
          var address = JSON.stringify(data);
          addressLng = data.results[0].geometry.location.lng;
          addressLat = data.results[0].geometry.location.lat;
          addressFormatted = data.results[0].formatted_address;
          // Create the map with the lat/lng retrieved from the API.
          map = new google.maps.Map(document.getElementById('map'), {
              zoom: 16,
              center: { lat: Number(addressLat), lng: Number(addressLng) },
          });
          addMarker(addressLat, addressLng, LocationString);
          $("#galleryName").text(LocationString);
          $("#galleryAddr").text(addressFormatted);
      });
}



























