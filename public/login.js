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


function login(){
	console.log("haha")
	firebase.auth().signInWithRedirect(provider);


}

