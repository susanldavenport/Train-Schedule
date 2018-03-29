
// Wait for the page to finish loading
$(document).ready(function() {

  //init and config firebase
  var config = {
    apiKey: "AIzaSyAfvwb0HxycvaOXTnIhNcTFA5z9SIO7nFY",
    authDomain: "train-tracker-8e6fe.firebaseapp.com",
    databaseURL: "https://train-tracker-8e6fe.firebaseio.com",
    projectId: "train-tracker-8e6fe",
    storageBucket: "train-tracker-8e6fe.appspot.com",
    messagingSenderId: "579503791133"
  };

  firebase.initializeApp(config);
  var database = firebase.database();
  
  //button click: add train
  $('button').on('click', function() {
    
    var trainName = $('#trainName').val().trim();
    var destination = $('#destination').val().trim();
    var firstTime = $('#firstTime').val().trim();
    var frequency = $('#frequency').val().trim(); 
    
    console.log('Train Name: ', trainName);
    console.log('Destination: ', destination);
    console.log('First Time: ', firstTime);
    console.log('Frequency: ', frequency);
    
    var firstTimeConv = moment(firstTime, 'HH:mm');
    var currentTime = moment().format('hh:mm');
    console.log('first time: ', firstTime)
    console.log('current time: ', currentTime); 

    var diffTime = moment().diff(moment(firstTimeConv), 'minutes');
    console.log('Difference: ' + diffTime);
    
    //min. left
    var tRemainder = diffTime % frequency;
    console.log('remainder: ' + tRemainder);
    // next train is x minutes away
    var minAway = frequency - tRemainder;
    console.log('min away: ' + minAway);

    var nextTrain = moment().add(minAway, "minutes");
    
    nextTrain = moment(nextTrain).format("hh:mm");
    console.log('next train: ' + nextTrain);


    var newTrain = {
      trainName: trainName,
      destination: destination, 
      firstTime: firstTime,
      frequency: frequency,
      minAway: minAway,
      nextTrain: nextTrain
    };

    // Adds new train to the DB
    database.ref().push(newTrain); 
    
  }); // END button click to add train 
  
  // This event will be triggered once for each initial child at this location, and it will be triggered again every time a new child is added. 
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    // console.log(snapshot.val());

    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTime = childSnapshot.val().firstTime;
    var frequency= childSnapshot.val().frequency;
    var minAway = parseInt(childSnapshot.val().minAway);
    var nextTrain = childSnapshot.val().nextTrain;
    
    //Change the HTML to reflect firebase data
    var tBody = $('.train-board');
    var tRow = $('<tr>');

    var nameTd = $('<td class="trainName">').text(trainName);
    var destinationTd = $('<td class="destination">').text(destination);
    var frequencyTd = $('<td class="frequency">').text(frequency);
    var nextTd = $('<td class="nextTrain">').text(nextTrain);
    var awayTd = $('<td class="minAway">').text(minAway);

    console.log('trainName: ', trainName);
    
    // Adds new employee to the DOM
    tRow.append(nameTd, destinationTd, frequencyTd, nextTd, awayTd);
    tBody.append(tRow);
    
    // Handle the errors
  // }, function(errorObject) {
  //   console.log("Errors handled: " + errorObject.code);
  });
  
  
  
  //__________________________JUNK PILE_______________________________
  
  // database.ref().on('value'), function(snapshot){
 
    // $("#name").text(name);
    // $("#role").text(role);
    // $("#startDate").text(startDate);
    // $("#rate").text(rate);
    
    // var tBody = $('.employee-board');
    // var tRow = $('<tr>');
    // var nameTd = $('<td class="name">').text(name);
    // var roleTd = $('<td class="role">').text(role);
    // var startTd = $('<td class="start">').text(startDate);
    // var workedTd = $('<td class="worked">').text(worked);
    // var rateTd = $('<td class="rate">').text(rate);
    // var billedTd = $('<td>').text(billed);
  
    // Adds new employee to the DOM
    // tRow.append(nameTd, roleTd, startTd, rateTd);
    // tBody.append(tRow);
});