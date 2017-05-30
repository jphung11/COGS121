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

function login(){
	console.log("haha")
	// firebase.auth().signInWithRedirect(provider);
	//window.location="https://foody-cogs121-1492804395262.firebaseapp.com/index.html";
firebase.auth().signInWithPopup(provider);	
}

function checkUser(){
	firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
	  // User is signed in.
	  console.log(user);
	  console.log(user.email);

	  name = user.displayName;
	  console.log(name)

	  document.getElementById('login-center').innerHTML = "<h2 class='ui blue image header'><p> Hi, "+name + "!</p>";

	} else {
	  // No user is signed in.
	  console.log ("No user")
	}
});
	// var user = firebase.auth().currentUser;

	
}