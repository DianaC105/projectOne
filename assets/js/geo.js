$(document).ready(function () {
    // Initialize Firebase
    
    // VARIABLES
    // --------------------------------------------------------------------------------

    // Get a reference to the database service
    var database = firebase.database();

    // Setting initial value of our click counter variable to 0
    var thumbsUpCounter = 0;
    var thumbsDownCounter = 0;

    // FUNCTIONS + EVENTS
    // --------------------------------------------------------------------------------

    // On Click of Thums-up Button
    $("#thumbsUp").on("click", function () {
        // event.preventDefault();
        // Add to clickCounter
        thumbsUpCounter++;
        console.log(thumbsUpCounter);
        //  Store Click Data to Firebase in a JSON property called clickCount
        // Note how we are using the Firebase .set() method
        database.ref().set({
            thumbsUpCount: thumbsUpCounter,
        });
    });

    // On Click of Thums-down Button
    $("#thumbsDown").on("click", function () {
        // event.preventDefault();
        // Add to clickCounter
        thumbsDownCounter++;
        console.log(thumbsDownCounter);

        //  Store Click Data to Firebase in a JSON property called clickCount
        // Note how we are using the Firebase .set() method
        database.ref().set({
            thumbsDownCount: thumbsDownCounter,
        });
    });



    // To retreive data from database and Presenting the Data on html page
    // --------------------------------------------------------------------------------

    // Using .on("value", function(snapshot)) syntax will retrieve the data
    // from the database (both initially and every time something changes)
    // This will then store the data inside the variable "snapshot". We could rename "snapshot" to anything.
    //   database.ref().on("value", function(snapshot) {

    //     // Then we console.log the value of snapshot
    //     console.log(snapshot.val());


    //     // Then we change the html associated with the number.
    //     $("#thumsup-value").text(snapshot.val().thumsupCount);

    //     $("#thumsdown-value").text(snapshot.val().thumsdownCount);

    //     // If there is an error that Firebase runs into -- it will be stored in the "errorObject"
    //     // Again we could have named errorObject anything we wanted.
    //   }, function(errorObject) {

    //     // In case of error this will print the error
    //     console.log("The read failed: " + errorObject.code);
    //   });
})