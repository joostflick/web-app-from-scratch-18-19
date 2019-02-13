// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

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
