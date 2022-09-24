const axios = require('axios');

module.exports = axios.create({
    baseURL: 'https://restful-booker.herokuapp.com/',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
});