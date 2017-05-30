//make a variable to keep track of data coming from firebase

var data= [];
var place;
var place_text;
var lng;
var ltd;
  // Initialize Firebase
      // TODO: Replace with your project's customized code snippet
var config = {
        apiKey: "AIzaSyAfCoC-kndsmuPJQs-OMjEFaIrQqWNeptg",
        //authDomain: "foody-cogs121-1492804395262.firebaseapp.com",
        databaseURL: "https://foody-cogs121-1492804395262.firebaseio.com",
        projectId: "foody-cogs121-1492804395262",
        storageBucket: "foody-cogs121-1492804395262.appspot.com",
        //messagingSenderId: "701518273477"
      };
firebase.initializeApp(config);
//create new connection to firebase
var ref= firebase.database().ref("dishes");
var storageRef = firebase.storage().ref("food_img");


//listen to data updates from firebase
ref.on("value", function (snapshot){
  console.log(snapshot.val());
 //when the data updates at firebase, put it in the data variable
  data= snapshot.val();
})
String.prototype.format = function () {
        var args = [].slice.call(arguments);
        return this.replace(/(\{\d+\})/g, function (a){
            return args[+(a.substr(1,a.length-2))||0];
        });
};

$( document ).ready(function() { 
  $('.ui.dropdown')
    .dropdown();
  $('.ui.form').form({
    fields: {
      user     : 'empty',
      foodname : ['minLength[6]', 'empty'],
      restaurant : ['minLength[6]', 'empty'],
      price: ['decimal','empty'],
      food_image : ['minLength[3]', 'empty'],
      description    : ['minLength[10]', 'empty'],
      tags    : ['minCount[1]', 'empty']
    }
  });
});
//Entire Form (handler)
function autocomplete(){
  autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */ (
                document.getElementById('restaurant')), {
             // types: ['restaurant'],
              //componentRestrictions: countryRestrict
            });
  autocomplete.addListener('place_changed', function() {
            place = autocomplete.getPlace();
            console.log(place)
            var geocoder = new google.maps.Geocoder();
            var address = place["formatted_address"];
            geocoder.geocode( { 'address': address}, function(results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
              ltd = results[0].geometry.location.lat();
              lng = results[0].geometry.location.lng();
            } 
          });
          });
        // Add a DOM event listener to react when the user selects a country.
}
// function createCORSRequest(method, url) {
//   var xhr = new XMLHttpRequest();
//   if ("withCredentials" in xhr) {
//     // XHR for Chrome/Firefox/Opera/Safari.
//     xhr.open(method, url, true);
//   } else if (typeof XDomainRequest != "undefined") {
//     // XDomainRequest for IE.
//     xhr = new XDomainRequest();
//     xhr.open(method, url);
//   } else {
//     // CORS not supported.
//     xhr = null;
//   }
//   return xhr;
// }

// function makeCorsRequest() {
//   // This is a sample server that supports CORS.
//   var url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid={0}&key=AIzaSyD1Z5S1c9XT0-rkej7fgofIWKE4CCmzn8Q'.format(place_id)
//   var xhr = createCORSRequest('GET', url);
//   if (!xhr) {
//     alert('CORS not supported');
//     return;
//   }

//   // Response handlers.
//   xhr.onload = function() {
//     place_text = xhr.responseText;
//     alert('Response from CORS request to ' + url+ ' ' +place_text);
//     // console.log(place_text)
//   };

//   xhr.onerror = function() {
//     alert('Woops, there was an error making the request.');
//   };

//   xhr.send();
// }
// var form = document.getElementById("food-submission"); 
// function handleForm(event) { 
//   event.preventDefault(); } 
// form.addEventListener('submit', handleForm);  
// $(document).on("click", "#submit", function(){
 function clickSubmit(){ 
  var $form = $(this);
  console.log("Submit to Firebase");
  
  //disable submit button
  // $form.find("#saveForm").prop('disabled', true);
  
  //get values to send to Firebase
  var publisher = $('#user').val();
  console.log(publisher);
  
  var restaurant = $('#restaurant').val();
  console.log(restaurant);
  
  var food_name= $('#foodname').val();
  console.log(food_name);
  var price_val= $('#price').val();
  console.log(price_val);
  var description= $('#description').val();
  console.log(description);
  var tags_str= $('#tags').val();
  var tags = tags_str.split(',')
  console.log(tags);
  var imgRef   = storageRef.child( 'image');
  place_id = place["place_id"]
  // request_URL = 'https://maps.googleapis.com/maps/api/place/details/json?placeid={0}&key=AIzaSyD1Z5S1c9XT0-rkej7fgofIWKE4CCmzn8Q'.format(place_id)
  // makeCorsRequest(request_URL)
  // console.log(httpGetAsync(request_URL))
  //take the values from the form, and put them in an object
 
    //  var json = JSON.parse(place_text);

  //put new object in data array
  console.log(data)
  imgName = place_id.concat(food_name)
  imageRef = firebase.storage().ref(place_id.concat(food_name))
  // console.log(place_id.concat(food_name))
  var selectedFile = document.getElementById('food_image').files[0];

  imageRef.put(selectedFile)
  console.log("haha");
   var post_restaurant= {
    "description": description,
    "food-name": food_name,
    "restaurant": restaurant,
    "price": price_val,
    "longitude":lng,
    "latitude": ltd,
    "place_id": place_id,
    "img_name": imgName,
    "tags": tags,
    "rating": 5
  }
 
  var newPostRef = ref.push();
  newPostRef.set(post_restaurant, function(err){
      if(err){
        alert("Data no go");
      }
    });
   //send the new data to Firebase
  	// ref.set(data, function(err){
   //    if(err){
   //      alert("Data no go");
   //    }
   //  });
  // alert("Successful submission. Thanks for your info!");
  setTimeout(function () {
        alert("Successful submission. Thanks for your info!");
        location.reload();

    }, 3000);

  //  console.log(json);
};

