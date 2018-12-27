// calling API for Geographics - Long & Lad:

// constructing a queryURL variable we will use instead of the literal string inside of the ajax method


$.ajax({

    url:"http://www.mapquestapi.com/geocoding/v1/address?key=zhLU35myS6CkWa8KkESTg9EJ2nTuLAnK&location=Edison"
    method: "GET",

  }).then(function(response) {
    console.log(response);

  });