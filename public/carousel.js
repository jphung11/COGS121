  var config = {
    apiKey: "AIzaSyAfCoC-kndsmuPJQs-OMjEFaIrQqWNeptg",
    authDomain: "foody-cogs121-1492804395262.firebaseapp.com",
    databaseURL: "https://foody-cogs121-1492804395262.firebaseio.com",
    projectId: "foody-cogs121-1492804395262",
    storageBucket: "foody-cogs121-1492804395262.appspot.com",
    messagingSenderId: "701518273477"
  };
  firebase.initializeApp(config);

  function addFood(){
    var dishRef = firebase.database().ref('dishes')
    dishRef.once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();

        imageRef = firebase.storage().ref(childData["img_name"])

        imageRef.getDownloadURL().then(function(url) {
          image = "<img src=".concat(url).concat(" style='width:100%;height:260px;'></img>");
          var d = document.createElement("DIV");
          //var content = document.createTextNode('<strong>' + childData["food-name"] + '</strong><br>'+childData["restaurant"]+'<br>' +image);
          var sub = "<div class='carousel-caption'><h3>".concat(childData["food-name"]).concat("</h3><p>").concat(childData["restaurant"]).concat("<p></div>");
          //var content = image + '<div class="carousel-caption><h3>' + childData["food-name"] + '</h3><p>'+childData["restaurant"]+'<p></div>';
          var content = image.concat(sub);

          d.className = "item";
          d.innerHTML = content;

          console.log(d);

/*
          var c = document.createElement("DIV");
          d.innerHTML += '<div class="carousel-caption><h3>' + childData["food-name"] + '</h3><p>'+childData["restaurant"]+'<p></div>';

          c.className = "carousel-caption";
          c.innerHTML = info;

          d.appendchild(c);
*/

          document.getElementById("two").appendChild(d);


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
      });
    })
  }
/*
        $.ajax({
            url         : "https://foody-cogs121-1492804395262.firebaseio.com/.json",
            type        : "GET",
            dataType    : "json",
            success     : function(data){

                $.each(data, function(i, data){

                    $(".carousel-inner").append('<div class="caraousel-item"> <h4>Food Name: ' + data.food-name + '</h4> <h4> Restaurant: ' + data.restaurant + '</h4> <img src="' + data.pc_image + '" /> </a></div>');
                });


            },
            error:function(){
                alert('error');
            }
        });*/