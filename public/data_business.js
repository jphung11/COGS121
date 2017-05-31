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

 function clickSubmit(){ 
  var $form = $(this);
  console.log("Submit to Firebase");
  
  
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

