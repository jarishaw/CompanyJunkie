var config = {
    apiKey: "AIzaSyAw80p_Upavg7JedGX40YUeN4zku9-aXsI",
    authDomain: "teamproject1-29c1e.firebaseapp.com",
    databaseURL: "https://teamproject1-29c1e.firebaseio.com",
    projectId: "teamproject1-29c1e",
    storageBucket: "teamproject1-29c1e.appspot.com",
    messagingSenderId: "728181397972"
  };
  
  firebase.initializeApp(config);
  // Create a variable to reference the database
  var database = firebase.database();

  var compSearch="";
// This .on("click") function will trigger the AJAX Call
$("#find-company").on("click", function(event) {
  // event.preventDefault() can be used to prevent an event's default behavior.
  // Here, it prevents the submit button from trying to submit a form when clicked
  event.preventDefault();

  // Here we grab the text from the input box
  compSearch = $("#company-input").val().trim();

    //if user does not input data the form will not run
   if(compSearch === "") {
    $(".link").empty();
    $(".name").empty();
    $(".rating").empty();
    $(".cv").empty();
    $(".lead").empty();
    $(".comp").empty();
    $(".wl").empty();
    return false;
  }
  //GlassDoor call
  var queryURL1 = "https://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=218864&t.k=iWl58Pz7Aei&action=employers&q=" + compSearch + "&userip=192.168.43.42&useragent=Mozilla/%2F4.0";
  
  $.ajax({
    url: queryURL1,
    method: "GET"
  })
  // We store all of the retrieved data inside of an object called "response"
  .done(function(response) {

    console.log(response);

      // // Storing the overall rating data
      var overallRating = (response.response.employers[0].overallRating);
      // Creating an element to have the rating displayed
      console.log(overallRating);
      $(".rating").text(overallRating);

      var cultureRating = (response.response.employers[0].cultureAndValuesRating);

      $(".cv").text(cultureRating);

      var leadershipRating = (response.response.employers[0].seniorLeadershipRating);
      
      $(".lead").text(leadershipRating);
    
      var compRating = (response.response.employers[0].compensationAndBenefitsRating);
     
      $(".comp").text(compRating);
      
      var wlRating = (response.response.employers[0].workLifeBalanceRating);

      $(".wl").text(wlRating);

      // $("#companyDataInfo").empty();
      // $("#companyDataInfo").append(pTwo, pThree, pFour, pFive); 
  });

  //Here we construct our URL
  var queryURL2 = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + compSearch + "&namespace=0&limit=1";
  $.ajax({
    url: queryURL2,
    method: "GET"
    }).done(function(response) {
      console.log(response);
      //$("#company-view").text(JSON.stringify(response));
      var linkName = $("<p>").text(response[3]);
      var linkURL = $("<a>").attr("href", response[3]).append(compSearch);
      $(".link").empty();
      $(".link").append(linkURL);
      
      var recentSearch= {
        compSearch: compSearch
      };

      database.ref().push(recentSearch);

      $("#company-input").val("");

  });

});

database.ref().on("child_added", function(childSnapshot, prevChildKey){

  var compSearch = childSnapshot.val().compSearch;
 // //      // Change the HTML to reflect
     $("#searchTable").prepend("<tr><td>" + compSearch +"</td></tr>");

 // //      // Handle the errors
    });