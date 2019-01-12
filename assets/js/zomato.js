$(document).ready(function () {
    // array of the 50 states
    var states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

    // function to populate form list with 50 states
    function stateList() {
        $("#exampleFormControlSelect1").empty();
        for (i = 0; i < states.length; i++) {
            var stateID = $("<option>")
            stateID.text(states[i]);
            $("#exampleFormControlSelect1").append(stateID);
        }
    }

    // call the function to populate list
    stateList();

    // some global variables defined
    var cityID = [];
    var stateCode = "";
    var cityName = "";
    var cityURL = "https://developers.zomato.com/api/v2.1/cities?";
    var lat = [];
    var long = [];

    //  variable to call firebase through
    var database = firebase.database();

    // call to firebase to populate a list of previously searched cities and states, limited to 5, and appends them to list
    database.ref().limitToLast(5).on("child_added", function (childSnapshot) {
            var cityData = childSnapshot.val().city;
            console.log(cityData);

            var stateData = childSnapshot.val().state;
            console.log(stateData);

            var lastSearch = $("<ul>").append(
                $("<li>").text(cityData + ", " + stateData)
            )
            $("#last-five").append(lastSearch);
        
    })

    // on-click function to execute a search based on form data that is input by user
    $("#search").on("click", function (event) {
        event.preventDefault()

        // animates the hidden map div to be visible
        $(".lighten-4").animate({ opacity: 1 });
        lat = [];
        long = [];

        // clears previous data from divs and makes them visible
        $("#restList").empty();
        $("#restList2").empty();
        $("#restList3").empty();
        $("#restList").animate({ opacity: 1 });
        $("#restList2").animate({ opacity: 1 });
        $("#restList3").animate({ opacity: 1 });

        //zomato ajax call
        cityName = "q=" + $("#exampleFormControlInput1").val();
        var searchCode = $("#exampleFormControlSelect1").val();

        var cityInput = $("#exampleFormControlInput1").val();
        var stateInput = $("#exampleFormControlSelect1").val();

        // takes data from form inputs and stores it to a firebase database
        database.ref().push({
            city: cityInput,
            state: stateInput,
        })

        // clears existing list and makes a call to firebase to populate a list of previously searched cities and states, limited to 5, and appends them to list
        $("#last-five").empty();
        database.ref().limitToLast(5).on("child_added", function (childSnapshot) {
            var cityData = childSnapshot.val().city;
            console.log(cityData);

            var stateData = childSnapshot.val().state;
            console.log(stateData);

            var lastSearch = $("<ul>").append(
                $("<li>").text(cityData + ", " + stateData)
            )
            $("#last-five").append(lastSearch);
        
    })

        //mapquest api gets Lat and Long
        var mapquestCity = "&location=" + $("#exampleFormControlInput1").val();
        var mapquestURL = "https://www.mapquestapi.com/geocoding/v1/address?key=zhLU35myS6CkWa8KkESTg9EJ2nTuLAnK" + mapquestCity;
        console.log(mapquestURL)

        $.ajax({

            url: mapquestURL,
            method: "GET",

        }).then(function (result) {
            console.log(result);
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
            var searchCount = "&count=9";
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
                console.log(search.restaurants)

                //for loop to pass through reataurant array
                for (i = 0; i < search.restaurants.length; i++) {

                    //if else ladder to ensure the results display in 3 different columns
                    if (i <= 2) {
                        $("#restList").append("<div class='card-header n" + i + "'></div>");
                        $(".n" + i + "").append("<h3>" + search.restaurants[i].restaurant.name + "</h3>");
                        $("#restList").append("<div class='card-body r" + i + "'></div>");
                        $(".r" + i + "").append("<img class='rest-image' src='" + search.restaurants[i].restaurant.featured_image + "' alt='Sorry No Image Found'>");
                        $(".r" + i + "").append("<h3><a href='" + search.restaurants[i].restaurant.url + "' target='blank'> Zomato Link </h3>");
                    }
                    else if (i <= 5 && i > 2) {
                        $("#restList2").append("<div class='card-header n" + i + "'></div>");
                        $(".n" + i + "").append("<h3>" + search.restaurants[i].restaurant.name + "</h3>");
                        $("#restList2").append("<div class='card-body r" + i + "'></div>");
                        $(".r" + i + "").append("<img class='rest-image' src='" + search.restaurants[i].restaurant.featured_image + "' alt='Sorry No Image Found'>");
                        $(".r" + i + "").append("<h3><a href='" + search.restaurants[i].restaurant.url + "' target='blank'> Zomato Link </h3>");
                    }
                    else {
                        $("#restList3").append("<div class='card-header n" + i + "'></div>");
                        $(".n" + i + "").append("<h3>" + search.restaurants[i].restaurant.name + "</h3>");
                        $("#restList3").append("<div class='card-body r" + i + "'></div>");
                        $(".r" + i + "").append("<img class='rest-image' src='" + search.restaurants[i].restaurant.featured_image + "' alt='Sorry No Image Found'>");
                        $(".r" + i + "").append("<h3><a href='" + search.restaurants[i].restaurant.url + "' target='blank'> Zomato Link </h3>");
                    }
                }

                //map display based on mapquest api call to grab lat and long
                mapboxgl.accessToken = 'pk.eyJ1IjoiamVla29qZWVrIiwiYSI6ImNqcW9kcm01NTRjeW80NGxibGUzY2RqaHIifQ.4Z__ZLSSP5pzbZreWBFDbQ';
                var map = new mapboxgl.Map({
                    container: 'map',
                    center: [long[0], lat[0]],
                    style: 'mapbox://styles/mapbox/streets-v9',
                    zoom: 10
                });

                // for loop to add tags to map markers using mapbox GL JS by mapbox and zomato api call results
                for (i = 0; i < search.restaurants.length; i++) {
                    var geojson = {
                        type: 'FeatureCollection',
                        features: [{
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: [search.restaurants[i].restaurant.location.longitude, search.restaurants[i].restaurant.location.latitude]
                            },
                            properties: {
                                title: search.restaurants[i].restaurant.name,
                                description: search.restaurants[i].restaurant.cuisines
                            }
                        }]
                    };

                    // add markers to map
                    geojson.features.forEach(function (marker) {

                        // create a HTML element for each feature
                        var el = document.createElement('div');
                        el.className = 'marker';

                        // make a marker for each feature and add to the map
                        new mapboxgl.Marker(el)
                            .setLngLat(marker.geometry.coordinates)
                            .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                                .setHTML('<h4>' + marker.properties.title + '</h4><p>' + marker.properties.description + '</p>'))
                            .addTo(map);
                    });
                }
            })
        })
    });
})
