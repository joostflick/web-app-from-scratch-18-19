// Code largely based on the google maps API example

var map, infoWindow
function initMap(location) {
  var locationUser = {
    lat: parseFloat(location.latitude),
    lng: parseFloat(location.longitude)
  }
  console.log(locationUser)
  map = new google.maps.Map(document.getElementById('map'), {
    center: locationUser,
    zoom: 5
  })
  var marker = new google.maps.Marker({
    position: locationUser,
    map: map
  })
  infoWindow = new google.maps.InfoWindow()
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos)
  infoWindow.setContent(
    browserHasGeolocation
      ? 'Error: The Geolocation service failed.'
      : "Error: Your browser doesn't support geolocation."
  )
  infoWindow.open(map)
}
