//make a variable to keep track of data coming from firebase

var data= [];
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
var storageRef = firebase.storage().ref();


//listen to data updates from firebase
ref.on("value", function (snapshot){
  console.log(snapshot.val());
 //when the data updates at firebase, put it in the data variable
  data= snapshot.val();
})
//Entire Form (handler)
function autocomplete(){
  autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */ (
                document.getElementById('restaurant')), {
             // types: ['restaurant'],
              //componentRestrictions: countryRestrict
            });
       
        // Add a DOM event listener to react when the user selects a country.
}
$(document).on("click", "#submit", function(){
  var $form = $(this);
  console.log("Submit to Firebase");
  
  //disable submit button
  // $form.find("#saveForm").prop('disabled', true);
  
  //get values to send to Firebase
  var publisher = $('#user').val();
  console.log(publisher);
  
  var restaurant = $('#restaurant').val();
  console.log(restaurant);
  
  var food_name= $('#food-name').val();
  console.log(food_name);
  var description= $('#description').val();
  console.log(description);
  var selectedFile = document.getElementById('food_image').files[0];
  var imgRef   = storageRef.child( 'image');

  //take the values from the form, and put them in an object
  var newActivity= {
    "description": description,
    "food-name": food_name,
    "restaurant": restaurant,
    //"image" : imgRef
  }
  //put new object in data array
  console.log(data)
  var newPostRef = ref.push();
  newPostRef.set(newActivity, function(err){
      if(err){
        alert("Data no go");
      }
    });
  imgRef.put(selectedFile).then(function(snapshot) {
  console.log('Uploaded a blob or file!');
  });
  console.log(data);
  
    //send the new data to Firebase
  	// ref.set(data, function(err){
   //    if(err){
   //      alert("Data no go");
   //    }
   //  });

    return false;
});
