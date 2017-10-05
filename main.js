'use strict';
/* global $ */



const AUTH_KEY = 'AIzaSyDsUCcz1-Fwcf_G5IPn858lI4jO8GONcyc';
const New_Key = 'AIzaSyCprVAwI3TpDPCNnlesm0G3JyRtgEyh9U4';
const GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
//const SEARCH_ENDPOINT = 'https://maps.googleapis.com/maps/api/place/nearbysearch/output?parameters';

const STORE = {
  searchTerm: null,
  latitude: null,
  longitude: null,
  map: null,
  keyword: null
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

function getRestaurantData(callback) {
  const query = {
    key: New_Key,
    location: {lat: STORE.latitude, lgn: STORE.longitude},
    radius: 100
  }
  $.getJSON(GEOCODE_URL, query, data => {
    console.log(data);
  })
  }




function genereateDataList(data) {
  STORE.latitude = data.results[0].geometry.location.lat;
  STORE.longitude = data.results[0].geometry.location.lng;
  const results = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${STORE.latitude},${STORE.longitude}&radius=500&types=restaurant&name=food&key=${AUTH_KEY}`;
  console.log(results); 
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
  });
}


//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670,151.1957&radius=500&types=food&name=cruise&key=YOUR_API_KEY
//https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=YOUR_API_KEY


$(() => {
  handleSearchClick();
});