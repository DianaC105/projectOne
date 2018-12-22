$(document).ready(function () {

    var cityID = [];
    var stateCode = "";
    var cityName = "";
    var cityURL = "https://developers.zomato.com/api/v2.1/cities?";
    var lat = [];
    var long = [];

    $("#search").on("click", function (event) {
        event.preventDefault()
        //zomato ajax call
        cityName = "q=" + $("#cityInput").val();
        var searchCode = $("#stateInput").val();

        // Gets cityID commented out for possible later use
        // var queryURL = cityURL + cityName;
        // console.log(queryURL);
        // $.ajax({
        //     url: queryURL,
        //     method: "GET",
        //     headers: {
        //         "user-key": "090b19f9dcd3d75690c6aa76fb72d9a2"
        //     }
        // }).then(function (response) {
        //     console.log(response);
        //     for (i = 0; i < response.location_suggestions.length; i++) {
        //         stateCode = response.location_suggestions[i].state_code;
        //         if (stateCode === searchCode) {
        //             console.log(response.location_suggestions[i].id);
        //             cityID.push(response.location_suggestions[i].id);

        //         }

        //     }
        //     console.log(cityID)

        // });

        //mapquest api gets Lat and Long
        var mapquestCity = "&location=" + $("#cityInput").val();
        var mapquestURL = "http://www.mapquestapi.com/geocoding/v1/address?key=zhLU35myS6CkWa8KkESTg9EJ2nTuLAnK" + mapquestCity;
        console.log(mapquestURL)

        $.ajax({

            url: mapquestURL,
            method: "GET",

        }).then(function (result) {
            console.log(result);
            //console.log(response.results["0"].locations["0"].latLng.lat);
            // var lattitude=result.results[0].locations[0].latLng.lat;
            // var longitude =result.results[0].locations[0].latLng.lng;

            // console.log(lattitude);
            // console.log(longitude);
            for (i = 0; i < result.results[0].locations.length; i++) {
                adminAreaCode = result.results[0].locations[i].adminArea3;
                if (adminAreaCode === searchCode) {
                    console.log(result.results[0].locations[i].latLng.lat);
                    console.log(result.results[0].locations[i].latLng.lng)
                    lat.push(result.results[0].locations[i].latLng.lat);
                    long.push(result.results[0].locations[i].latLng.lng)

                }

            }

            //Zomato search call returns 10 restaurants based on search parameters
            var searchLat = "&lat=" + lat[0];
            var searchLong = "&lon=" + long[0];
            var searchID = "entity_id=" + cityID[0];
            var searchType = "&entity_type=city";
            var searchRadius = "&radius=10000";
            var searchCount = "&count=10";
            var searchURL = "https://developers.zomato.com/api/v2.1/search?";
            var newURL = searchURL + searchCount + searchLat + searchLong + searchRadius;
            console.log(newURL);

            $.ajax({
                url: newURL,
                method: "GET",
                headers: {
                    "user-key": "090b19f9dcd3d75690c6aa76fb72d9a2"
                }
            }).then(function (search) {
                console.log(search.restaurants);
            })
            // console.log(lat);
            // console.log(long);

            // var searchLat = "&lat=" + lat[0];
            // var searchLong = "&lon=" + long[0];
            // var searchID = "entity_id=" + cityID[0];
            // var searchType = "&entity_type=city";
            // var searchRadius = "&radius=10000";
            // var searchCount = "&count=10";
            // var searchURL = "https://developers.zomato.com/api/v2.1/search?";
            // var newURL = searchURL + searchID + searchType + searchCount + searchLat + searchLong + searchRadius;
            // console.log(searchURL);

            // $.ajax({
            //     url: newURL,
            //     method: "GET",
            //     headers: {
            //         "user-key": "090b19f9dcd3d75690c6aa76fb72d9a2"
            //     }
            // }).then(function (search) {
            //     console.log(search);
            // })
        })
    });
})


//     var searchLat = "&lat=" + lat[0];
//     var searchLong = "&lon=" + long[0];
//     var searchID = "entity_id=" + cityID[0];
//     var searchType = "&entity_type=city";
//     var searchRadius = "&radius=10000";
//     var searchCount= "count=10";
//     var searchURL = "https://developers.zomato.com/api/v2.1/search?";
//     var newURL = searchURL + searchID + searchType + searchCount + searchLat + searchLong + searchRadius;

//     $.ajax({
//         url: newURL,
//         method: "GET",
//         headers: {
//             "user-key": "090b19f9dcd3d75690c6aa76fb72d9a2"
//         }
//     }).then(function(search){
//         console.log(search);
//     })
// })