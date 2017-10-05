'use strict';
/* global $ */
/* global google */

const AUTH_KEY = 'AIzaSyDsUCcz1-Fwcf_G5IPn858lI4jO8GONcyc';
const GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
const ZOOM = 16;
const RADIUS = 500;
const PLACES = ['restaurant'];

const htmlMap = document.getElementById('map');

const STORE = {
  searchTerm: null,
  latitude: -33.867,
  longitude: 151.195,
  map: null,
  keyword: null,
  place_id: null
};

function getLocation() {
  console.log('====================================');
  console.log(navigator);
  console.log('====================================');
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position, error) => {

      if (error == null) {
        STORE.latitude = position.coords.latitude;
        STORE.longitude = position.coords.longitude;

        initMap();
      } else {
        initMap();
      }
    });
  } else {
    initMap();
  }
}

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
  STORE.latitude = data.results[0].geometry.location.lat;
  STORE.longitude = data.results[0].geometry.location.lng;
  STORE.place_id = data.results[0].place_id;
  initMap();
}


function handleSearchClick() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    console.log('hit search');
    const searchTarget = $(event.currentTarget).find('.js-query');
    const search = searchTarget.val();
    STORE.searchTerm = search;
    console.log('====================================');
    console.log('s', search);
    console.log('====================================');
    searchTarget.val('');

    getSearchLocation(search, genereateDataList);
    //initMap();
  });
}


let map;
let infowindow;

function initMap() {
  const searchPlace = {lat: STORE.latitude, lng:  STORE.longitude};

  map = new google.maps.Map(htmlMap, {
    center: searchPlace,
    zoom: ZOOM
  });


  infowindow = new google.maps.InfoWindow();

  const service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: searchPlace,
    radius: RADIUS,
    type: PLACES
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
  const placeLoc = place.geometry.location;
  const marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  marker.addListener('click', toggleBounce);

  function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}


//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670,151.1957&radius=500&types=food&name=cruise&key=YOUR_API_KEY
//https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=YOUR_API_KEY


$(() => {
  handleSearchClick();
});