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
        change();
}

function addToUserList(typeOfInteraction){
	var user = firebase.auth().currentUser;
	console.log(typeOfInteraction)
	if (user != null){
		var user_id = user.uid;
		var insertRef = database.ref('users/'+user_id+'/'+children[MenuCnt-1]);
		console.log(children[MenuCnt-1])
		console.log(children)
		
		insertRef.set({
            type : typeOfInteraction
        });
		change();
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
                    if (MenuCnt == children.length) {
                        document.getElementById("foodPic").src = "./images/nomore.png"
                        document.getElementById("foodPic").alt = "No more";
                        document.getElementById("foodName").innerHTML = "Currently no more dishes! :(";
                        document.getElementById("restName").innerHTML = "";
                        document.getElementById("stars").innerHTML = "";
                        return;
                    }   
                    var user = firebase.auth().currentUser;
                    if (user != null){
                        var insertRef = database.ref('users/'+user.uid+'/'+children[MenuCnt]);
                        console.log(MenuCnt);
                        console.log(children[MenuCnt]);
                        console.log(insertRef);
                        insertRef.once('value', function(snapshot) {
                            var exists = (snapshot.val() !== null);
                            console.log(exists);
                            console.log(snapshot.val());
                            if (!exists){
                                var storageRef = storage.ref(CurrRestaurants[children[MenuCnt]].img_name);
                                storageRef.getDownloadURL().then(url => {
                                    document.getElementById("foodPic").setAttribute("src", url);
                                }).catch(error => {
                                    console.log(error.message);
                                });
                                console.log(MenuCnt);
                                console.log(children[MenuCnt]);
                                document.getElementById("foodPic").alt = CurrRestaurants[children[MenuCnt]]["food-name"];
                                document.getElementById("foodName").innerHTML = CurrRestaurants[children[MenuCnt]]["food-name"];
                                document.getElementById("restName").innerHTML = CurrRestaurants[children[MenuCnt]].restaurant;
                                document.getElementById("stars").innerHTML = "<label>Rating:</label>";

                    
                                var k;
                                for (k = 0; k < 4; k++) {
                                    var spanfilled = document.createElement("span");
                                    var elem1 = document.createElement("img");
                                    elem1.src = "images/starfilled.png";
                                    elem1.setAttribute("class", "img-responsive");
                                    spanfilled.appendChild(elem1);
                                                
                                    document.getElementById("stars").appendChild(spanfilled);
                                }
                                MenuCnt++;
                            }
                            else{
                                MenuCnt++;
                                change();

                            }
                        });
                            
                        }
                    else{
                        console.log("no userr");
              
                    }
                
                });
            
}