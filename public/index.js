var config = {
        apiKey: "AIzaSyAfCoC-kndsmuPJQs-OMjEFaIrQqWNeptg",
        authDomain: "foody-cogs121-1492804395262.firebaseapp.com",
        databaseURL: "https://foody-cogs121-1492804395262.firebaseio.com",
        projectId: "foody-cogs121-1492804395262",
        storageBucket: "foody-cogs121-1492804395262.appspot.com",
        //messagingSenderId: "701518273477"
      };
firebase.initializeApp(config);
var provider = new firebase.auth.GoogleAuthProvider();
console.log("done with initializing")
var database = firebase.database();

var RestCnt = 0;
var MenuCnt = 0;
var children = [];
var storage = firebase.storage();
var dishRef = firebase.database().ref('dishes');
function initData(){

        dishRef.once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                children.push(childKey);
            });
        });

        console.log(children);

        var restaurants = firebase.database().ref('dishes').once('value').then(function (snapshot) {
            var CurrRestaurants = snapshot.val();
            var i;
            var j;
          

            var storageRef = storage.ref(CurrRestaurants[children[MenuCnt]].img_name);
            storageRef.getDownloadURL().then(url => {
                document.getElementById("foodPic").setAttribute("src", url);
            }).catch(error => {
                console.log(error.message);
            });

            document.getElementById("foodPic").alt = CurrRestaurants[children[MenuCnt]]["food-name"];
            document.getElementById("foodName").innerHTML = CurrRestaurants[children[MenuCnt]]["food-name"];
            document.getElementById("restName").innerHTML = CurrRestaurants[children[MenuCnt]].restaurant;

            
            var k;
            for (k = 0; k < 5; k++) {
                var spanfilled = document.createElement("span");
                var elem1 = document.createElement("img");
                elem1.src = "../images/starfilled.png";
                elem1.setAttribute("class", "img-responsive");
                spanfilled.appendChild(elem1);
                                
                document.getElementById("stars").appendChild(spanfilled);
            }

            MenuCnt++;

        });
}
function checkUser(){
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
		  // User is signed in.
		  console.log(user);
		  console.log(user.email);

		  name = user.displayName;
		  console.log(name)

		  document.getElementById('login-corner').innerHTML = "<a class='ui item'> Hi, "+name + "!</a>"
		} else {
		  // No user is signed in.
		  document.getElementById('login-corner').innerHTML = "<a class='ui item' href='./login.html'>Log in </a>"
		}
	});
	// var user = firebase.auth().currentUser;	
}
function addToUserList(typeOfInteraction){
	var user = firebase.auth().currentUser;
	console.log(typeOfInteraction)
	if (user != null){
		var user_id = user.uid;
		var insertRef = database.ref('users/'+user_id+'/'+typeOfInteraction);
		var newListRef = insertRef.push()
		console.log(children[MenuCnt-1])
		console.log(children)
		

		var dish= {
			"id": children[MenuCnt-1]
		}
		newListRef.set(dish, function(err){
	      if(err){
	        alert("Data no go");
	      }
	    });
		change()
	}
	else{
		alert("Please login first")
	}
}
function like(){
	console.log("LIKE this dish")
	addToUserList('like')
}
function dislike(){
	console.log("DISLIKE this dish")
	addToUserList('dislike')
}
function superlike(){
	console.log("SUPER LIKE this dish")
	addToUserList('superlike')
}
function change() {
            firebase.database().ref('dishes').once('value').then(function (snapshot) {
                var CurrRestaurants = snapshot.val();
                console.log(children.length);
                if (MenuCnt > children.length - 1) {
                    document.getElementById("foodPic").src = "../images/nomore.png"
                    document.getElementById("foodPic").alt = "No more";
                    document.getElementById("foodName").innerHTML = "Currently no more dishes! :(";
                    document.getElementById("restName").innerHTML = "";
                    document.getElementById("stars").innerHTML = "";
                    return;
                }

                var storageRef = storage.ref(CurrRestaurants[children[MenuCnt]].img_name);
                storageRef.getDownloadURL().then(url => {
                    document.getElementById("foodPic").setAttribute("src", url);
                }).catch(error => {
                    console.log(error.message);
                });

                document.getElementById("foodPic").alt = CurrRestaurants[children[MenuCnt]]["food-name"];
                document.getElementById("foodName").innerHTML = CurrRestaurants[children[MenuCnt]]["food-name"];
                document.getElementById("restName").innerHTML = CurrRestaurants[children[MenuCnt]].restaurant;
                document.getElementById("stars").innerHTML = "<label>Rating:</label>";

                //                document.getElementById("foodPic").src=CurrRestaurants[RestCnt].Menu[MenuCnt].Picture;
                //                document.getElementById("foodPic").alt=CurrRestaurants[RestCnt].Menu[MenuCnt].Name;
                //                document.getElementById("foodName").innerHTML=CurrRestaurants[RestCnt].Menu[MenuCnt].Name;
                //                document.getElementById("restName").innerHTML=CurrRestaurants[RestCnt].Name;
                //                
                //                document.getElementById("stars").innerHTML="";
                //                var k;
                //                for (k = 0; k < parseInt(CurrRestaurants[RestCnt].Menu[MenuCnt].Rating); k++) {
                //                    var spanfilled = document.createElement("span");
                //                    var elem1 = document.createElement("img");
                //                    elem1.src = "../images/starfilled.png";
                //                    elem1.setAttribute("class", "img-responsive");
                //                    spanfilled.appendChild(elem1);
                //                    
                //                    document.getElementById("stars").appendChild(spanfilled);
                //                }
                //
                //                for (; k < 5; k++) {
                //                    var spanempty = document.createElement("span");
                //                    var elem2 = document.createElement("img");
                //                    elem2.src = "../images/starempty.png";
                //                    elem2.setAttribute("class", "img-responsive");
                //                    spanempty.appendChild(elem2);
                //                    
                //                    document.getElementById("stars").appendChild(spanempty);
                //                }

                var k;
                for (k = 0; k < 4; k++) {
                    var spanfilled = document.createElement("span");
                    var elem1 = document.createElement("img");
                    elem1.src = "../images/starfilled.png";
                    elem1.setAttribute("class", "img-responsive");
                    spanfilled.appendChild(elem1);
                                
                    document.getElementById("stars").appendChild(spanfilled);
                }
                

                
                MenuCnt++;
                //                console.log("CurrRestaurants: " + CurrRestaurants.length);
                //                console.log("MenuCnt: " + MenuCnt);
            });
        }
// $(document).ready(function () {

//     $('.ui.rating')
//         .rating();

// });