var map;
var service;
var infowindow;
var markersArray = [];
var config = {
  apiKey: "AIzaSyAfCoC-kndsmuPJQs-OMjEFaIrQqWNeptg",
  databaseURL: "https://foody-cogs121-1492804395262.firebaseio.com",
  projectId: "foody-cogs121-1492804395262",
  storageBucket: "foody-cogs121-1492804395262.appspot.com",
};
firebase.initializeApp(config);
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
function showAllPlaces(){
  clearOverlays();
  var dishRef = firebase.database().ref('dishes')
  dishRef.once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    // for (var i in childData){
        marker = new google.maps.Marker({
        map: map,
        title: childData["restaurant"],
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(childData["latitude"], childData["longitude"])
      });
    console.log(childData["place_id"])
  imageRef = firebase.storage().ref(childData["img_name"])

// Get the download URL
imageRef.getDownloadURL().then(function(url) {
    image = "<img src=".concat(url).concat(" style='width:200px;height:100px;'></img>");
    google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent('<div><strong>' + childData["food-name"] + '</strong><br>'+childData["restaurant"]+'<br>'
      +image+'</div>');
   infowindow.open(map,this);
  })
}).catch(function(error) {

  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/object_not_found':
      // File doesn't exist
      break;

    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      break;

    case 'storage/canceled':
      // User canceled the upload
      break;

    case 'storage/unknown':
      // Unknown error occurred, inspect the server response
      break;
  }
});
    
    markersArray.push(marker);
    });
  console.log("haha")
  })
}
function clearOverlays() {
  for (var i = 0; i < markersArray.length; i++ ) {
    markersArray[i].setMap(null);
  }
  markersArray.length = 0;
}