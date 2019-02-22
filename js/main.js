var reservationData = {};

// Initialize Firebase
var config = {
  apiKey: "AIzaSyC-6c0jtoqxiOtTed3zmEnaFLnoAot4u8k",
  authDomain: "restaurant-site-638ca.firebaseapp.com",
  databaseURL: "https://restaurant-site-638ca.firebaseio.com",
  projectId: "restaurant-site-638ca",
  storageBucket: "restaurant-site-638ca.appspot.com",
};
firebase.initializeApp(config);

// Connect to Database
var database = firebase.database();

// set the day when an option is clicked on
$('.reservation-day li').click(function() {
  reservationData.day = $(this).text();
});

// when clicked, the name data should be set
// and all data should be sent to your database
$('.reservations').on('submit', function(event) {
  // prevent reloading
  event.preventDefault();

  // get name from input
  reservationData.name = $('.reservation-name').val();

  // push configured data object to database
  database.ref('reservations').push(reservationData);
});


// on initial load and addition of each reservation update the view
database.ref('reservations').on('child_added', function(snapshot) {
  // grab element to hook to
  var reservationList = $('.reservation-list');
  // get data from database
  var reservations = snapshot.val();
  // get your template from your script tag
  var source   = $("#reservation-template").html();
  // compile template
  var template = Handlebars.compile(source);
  // pass data to template to be evaluated within handlebars
  // as the template is created
  var reservationTemplate = template(reservations);
  // append created templated
  reservationList.append(reservationTemplate);
});

// initialize the configuration of map
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.7128, lng: -74.0059},
    zoom: 10,
    scrollwheel: false,
    styles: [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}]
  });

  // use Marker constructor to add a marker to map
  var marker = new google.maps.Marker({
    position: {lat: 40.7128, lng: -74.0059},
    map: map,
    title: 'Monks Café'
  });
}