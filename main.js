'use strict';
/* global $ */
/* global google */

const AUTH_KEY = 'AIzaSyDsUCcz1-Fwcf_G5IPn858lI4jO8GONcyc';
const New_Key = 'AIzaSyCprVAwI3TpDPCNnlesm0G3JyRtgEyh9U4';
const GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

const STORE = {
  searchTerm: null,
  latitude: 30.2946438,
  longitude: -97.7025981,
  map: null,
  keyword: null,
  place_id: null
};

// Test Ping to API
const name = 'richmond';
$.getJSON(GEOCODE_URL, {
  address: name,
  key: AUTH_KEY
}, data => {
  console.log(data);
});


function getSearchLocation(searchValue, callback) {
  const query = {
    address: searchValue,
    key: AUTH_KEY
  };
  $.getJSON(GEOCODE_URL, query, callback);
}

// function getRestaurantData() {
//   const query = {
//     key: New_Key,
//     location: {lat: STORE.latitude, lgn: STORE.longitude},
//     radius: 100,
//     place_id: 'ChIJLwPMoJm1RIYRetVp1EtGm10'
//   };
//   $.getJSON(GEOCODE_URL, query, data => {
//     console.log(data);
//   });
// }

// getRestaurantData();


function genereateDataList(data) {
    console.log('herehere', data);
  STORE.latitude = data.results[0].geometry.location.lat;
  STORE.longitude = data.results[0].geometry.location.lng;
  STORE.place_id = data.results[0].place_id;
  const results = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${STORE.latitude},${STORE.longitude}&radius=500&types=restaurant&name=food&key=${AUTH_KEY}`;
  console.log(results); 
  $('.js-search-results').html(results);
}





function handleSearchClick() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    console.log('hit search');
    const searchTarget = $(event.currentTarget).find('.js-query');
    const search = searchTarget.val();
    STORE.searchTerm = search;
    searchTarget.val('');
    
    getSearchLocation(search, genereateDataList);
    //initMap();
  });
}


var map;
var infowindow;

function initMap() {
  var searchPlace = {lat: STORE.latitude, lng:  STORE.longitude};

  map = new google.maps.Map(document.getElementById('map'), {
    center: searchPlace,
    zoom: 20
  });

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: searchPlace,
    radius: 500,
    type: ['restaurant']
  }, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}


//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670,151.1957&radius=500&types=food&name=cruise&key=YOUR_API_KEY
//https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=YOUR_API_KEY


$(() => {
  handleSearchClick();
  initMap();
});