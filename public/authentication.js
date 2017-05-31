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