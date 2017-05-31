var map;
var service;
var infowindow;
var markersArray = [];
var geoMarker = [];
var listOfRestaurant = [];
var config = {
  apiKey: "AIzaSyAfCoC-kndsmuPJQs-OMjEFaIrQqWNeptg",
  authDomain: "foody-cogs121-1492804395262.firebaseapp.com",
  databaseURL: "https://foody-cogs121-1492804395262.firebaseio.com",
  projectId: "foody-cogs121-1492804395262",
  storageBucket: "foody-cogs121-1492804395262.appspot.com",
};
firebase.initializeApp(config);
var database = firebase.database();
var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';
function checkUser(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log(user);
      console.log(user.email);
      name = user.displayName;
      var imgURL;
      user.providerData.forEach(function (profile){
        console.log(profile.photoURL)
        imgURL = profile.photoURL;
      });
      console.log(name)

      document.getElementById('login-corner').innerHTML = "<a class='ui item'> Hi, "+name + "!   <img width=20 height=25 src=" +imgURL + "></a>"
    } else {
      // No user is signed in.
      document.getElementById('login-corner').innerHTML = "<a class='ui item' href='./login.html'>Log in </a>"
    }
  });
  // var user = firebase.auth().currentUser;  
}
$(document).ready(function () {
  $('.menu .item')
    .tab();

    $('.tabular.menu .item').tab();
});

function initMap() {
  var ucsd = new google.maps.LatLng(32.8800604, -117.2340135);

  map = new google.maps.Map(document.getElementById('map'), {
    center: ucsd,
    zoom: 11
  });
  service = new google.maps.places.PlacesService(map);
  infowindow = new google.maps.InfoWindow();

  var geolocdiv = document.createElement('div');
  var geoloccont = new GeolocationControl(geolocdiv, map);

  map.controls[google.maps.ControlPosition.TOP_CENTER].push(geolocdiv);
}

function GeolocationControl(controlDiv, map) {

  // Set CSS for the control button
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#444';
  controlUI.style.borderStyle = 'solid';
  controlUI.style.borderWidth = '1px';
  controlUI.style.borderColor = 'white';
  controlUI.style.height = '28px';
  controlUI.style.marginTop = '5px';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to center map on your location';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control text
  var controlText = document.createElement('div');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '10px';
  controlText.style.color = 'white';
  controlText.style.paddingLeft = '10px';
  controlText.style.paddingRight = '10px';
  controlText.style.marginTop = '8px';
  controlText.innerHTML = 'Current Location';
  controlUI.appendChild(controlText);

  // Setup the click event listeners to geolocate user
  google.maps.event.addDomListener(controlUI, 'click', geolocate);
}

function clearGeo() {
  for (var i = 0; i < geoMarker.length; i++) {
    geoMarker[i].setMap(null);
  }
  geoMarker.length = 0;
}

function geolocate() {
  clearGeo();
  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function (position) {

      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      // Create a marker and center map on user location
      marker = new google.maps.Marker({
        position: pos,
        animation: google.maps.Animation.DROP,
        map: map,
        draggable: true,
        icon: im
      });

      map.setCenter(pos);
      geoMarker.push(marker);
    });
  }
}

function initialize() {
  var ucsd = new google.maps.LatLng(32.8800604, -117.2340135);


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

  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
      '<br>' + place.formatted_address);
    infowindow.open(map, this);
  })

  markersArray.push(marker);


}

function pickPlace(param) {
  search_term = param.innerHTML;
  var ucsd = new google.maps.LatLng(32.8800604, -117.2340135);

  clearOverlays();
  var request = {
    location: ucsd,
    radius: '10000',
    query: search_term
  };
  service.textSearch(request, callback);

}
function createMarkerForUser(typeOfInteraction){
  console.log(listOfRestaurant);
  var icon_image;
  if (typeOfInteraction == "like"){
    icon_image = "https://cdn1.iconfinder.com/data/icons/navigation-ui/154/love-heart-24.png"
  }
  else{
    icon_image = "https://cdn2.iconfinder.com/data/icons/default-1/100/.svg-4-24.png"
  }
 for (var i = 0; i < listOfRestaurant.length; i++) {
  var info = new google.maps.InfoWindow()
  var dishRef = firebase.database().ref('dishes/'+listOfRestaurant[i])

  dishRef.once('value', function (snapshot) {
    var childData = snapshot.val();
    var marker = new google.maps.Marker({
    map: map,
    title: childData["restaurant"],
    animation: google.maps.Animation.DROP,
    position: new google.maps.LatLng(childData["latitude"], childData["longitude"]),
    icon: icon_image
  });
  console.log(childData["place_id"])
  imageRef = firebase.storage().ref(childData["img_name"])

  // Get the download URL
  imageRef.getDownloadURL().then(function (url) {
    image = "<img src=".concat(url).concat(" style='width:150px;height:150px;'></img>");
    console.log(image)
    var str = "<div><strong>" + childData["food-name"] + "</strong><br>" + childData["restaurant"] + "<br>" +
      image + "</div>";
    // info.setContent(str);
    marker.info = new google.maps.InfoWindow({
      content: str
    });
    google.maps.event.addListener(marker, 'click', function () {
      marker.info.open(map, marker);

    })
    // marker.addListener('click', function() {
    //     infowindow.open(map, marker);
    //   });


  }).catch(function (error) {

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
}
}
function loadUserInfo(user_id,typeOfInteraction)
{   
    console.log("start creating marker for" + typeOfInteraction +"of user: " + user_id);
    var userRef = database.ref('users/'+user_id+'/'+typeOfInteraction);
    listOfRestaurant = [];

    userRef.once('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        console.log(childKey)
        console.log(childData)
        listOfRestaurant.push(childData["id"])
        });
    });
    setTimeout(function() { createMarkerForUser(typeOfInteraction); }, 5000);

    
}
function showUserPlaces(){
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var user_id = user.uid;
    console.log(user_id);
    loadUserInfo(user_id,"like");
    setTimeout(function() { loadUserInfo(user_id,"superlike"); }, 5000);

    
  } else {
    alert("Please login first")
  }
  });
    
}
function showRecommendedPlaces(){

}
function showAllPlaces() {
  clearOverlays();
  showUserPlaces();
  showRecommendedPlaces();
  // var info = new google.maps.InfoWindow()
  // var dishRef = firebase.database().ref('dishes')
  // dishRef.once('value', function (snapshot) {
  //   snapshot.forEach(function (childSnapshot) {
  //     var childKey = childSnapshot.key;
  //     var childData = childSnapshot.val();
  //     // for (var i in childData){
  //     var marker = new google.maps.Marker({
  //       map: map,
  //       title: childData["restaurant"],
  //       animation: google.maps.Animation.DROP,
  //       position: new google.maps.LatLng(childData["latitude"], childData["longitude"])
  //     });
  //     console.log(childData["place_id"])
  //     imageRef = firebase.storage().ref(childData["img_name"])

  //     // Get the download URL
  //     imageRef.getDownloadURL().then(function (url) {
  //       image = "<img src=".concat(url).concat(" style='width:150px;height:150px;'></img>");
  //       console.log(image)
  //       var str = "<div><strong>" + childData["food-name"] + "</strong><br>" + childData["restaurant"] + "<br>" +
  //         image + "</div>";
  //       // info.setContent(str);
  //       marker.info = new google.maps.InfoWindow({
  //         content: str
  //       });
  //       google.maps.event.addListener(marker, 'click', function () {
  //         marker.info.open(map, marker);

  //       })
  //       // marker.addListener('click', function() {
  //       //     infowindow.open(map, marker);
  //       //   });


  //     }).catch(function (error) {

  //       // A full list of error codes is available at
  //       // https://firebase.google.com/docs/storage/web/handle-errors
  //       switch (error.code) {
  //         case 'storage/object_not_found':
  //           // File doesn't exist
  //           break;

  //         case 'storage/unauthorized':
  //           // User doesn't have permission to access the object
  //           break;

  //         case 'storage/canceled':
  //           // User canceled the upload
  //           break;

  //         case 'storage/unknown':
  //           // Unknown error occurred, inspect the server response
  //           break;
  //       }
  //     });

  //     markersArray.push(marker);
  //   });
  //   console.log("haha")
  // })
}

function clearOverlays() {
  for (var i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(null);
  }
  markersArray.length = 0;
}