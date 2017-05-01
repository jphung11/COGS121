var map;
var service;
var infowindow;
var markersArray = [];

function initMap() {
  var ucsd = new google.maps.LatLng(32.8800604,-117.2340135);

  map = new google.maps.Map(document.getElementById('map'), {
      center: ucsd,
      zoom: 11
    });
  service = new google.maps.places.PlacesService(map);
  infowindow = new google.maps.InfoWindow();
}
        
function initialize() {
  var ucsd = new google.maps.LatLng(32.8800604,-117.2340135);


  var request = {
    location: ucsd,
    radius: '10000',
    query: 'restaurant'
  };

  service.textSearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}
function createMarker(place) {
  var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };
  marker = new google.maps.Marker({
    map: map,
    icon: image,
    title: place.name,
    animation: google.maps.Animation.DROP,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent('<div><strong>' + place.name + '</strong><br>'+
      '<br>' + place.formatted_address);
    infowindow.open(map,this);
  })

  markersArray.push(marker);


}
function pickPlace(param) {
  search_term = param.innerHTML;
  var ucsd = new google.maps.LatLng(32.8800604,-117.2340135);

  clearOverlays();
  var request = {
    location: ucsd,
    radius: '10000',
    query: search_term
  };
  service.textSearch(request, callback);

}
function clearOverlays() {
  for (var i = 0; i < markersArray.length; i++ ) {
    markersArray[i].setMap(null);
  }
  markersArray.length = 0;
}