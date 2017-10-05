'use strict';
/* global $ */



const AUTH_KEY = 'AIzaSyDsUCcz1-Fwcf_G5IPn858lI4jO8GONcyc';
const GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
//const SEARCH_ENDPOINT = 'https://maps.googleapis.com/maps/api/place/nearbysearch/output?parameters';

const STORE = {
  latitude: null,
  longitude: null,
  map: null
};




const name = 'richmond';
$.getJSON(GEOCODE_URL, {
  address: name,
  key: AUTH_KEY
}, data => {
  console.log(data);
});











//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670,151.1957&radius=500&types=food&name=cruise&key=YOUR_API_KEY
//https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=YOUR_API_KEY
