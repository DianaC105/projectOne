// calling API for Geographics - Long & Lad:

// constructing a queryURL variable we will use instead of the literal string inside of the ajax method
// $(document).ready(function () {
//   var location = "";
//   var adminAreaCode=""
//   var searchCode=""
//   $("#search").on("click", function (event) {
//     event.preventDefault()
//     searchCode=$("#exampleFormControlSelect1").val();
//     console.log(searchCode)
//     location = "&location=" + $("#exampleFormControlInput1").val();
//     $.ajax({

//       url: "http://www.mapquestapi.com/geocoding/v1/address?key=zhLU35myS6CkWa8KkESTg9EJ2nTuLAnK" + location,
//       method: "GET",

//     }).then(function (response) {
//       console.log(response);
//       for (i = 0; i < response.results[0].locations.length; i++) {
//         adminAreaCode = response.results[0].locations[i].adminArea3;
//         //console.log(adminAreaCode)
//         if (adminAreaCode === searchCode) {
//           console.log(adminAreaCode)
//             console.log(response.results[0].locations[i].mapUrl);
//             $("#map").append("<img src='" + response.results[0].locations[i].mapUrl + "'>")


//         }

//     }

//     });
//   });
// });