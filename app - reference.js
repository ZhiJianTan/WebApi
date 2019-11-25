const express = require('express');
const app = express();
const axios = require('axios');
const Movie = require('./Movie');

//const apikey = '17a317af';

//localhost:5000/getmovie?title=MovieTitle
  //const title = req.query.title;
  const querystr = `https://openlibrary.org/api/books?bibkeys=ISBN:9780980200447&jscmd=data&format=json`;
  

  axios
    .get(querystr)
    .then(response => {
  const objectKeys = Object.keys(response['data'])
for(const key of objectKeys) {
	console.log(response['data'][key].title)
}
    })