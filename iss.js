const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

// use request to fetch IP address from JSON API
const fetchMyIP = function(callback) {
  request.get('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
    } else if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    } else {
      let data = JSON.parse(body);
      callback(null, data.ip);
  
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request.get('https://ipvigilante.com/' + ip, (error, response, body) => {
    if (error) {
      callback(error, null);
    } else if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`), null);
      return;
    } else {
      const data = JSON.parse(body);

      const {latitude, longitude } = data.data;
      // let coord = {
      //   latitude: latitude,
      //   longitude: longitude
      // }
      callback(null, {latitude, longitude});
      // callback(null, coord);
  
    }
  });
};


const fetchISSFlyOverTimes = function(obj, callback) {
  request.get(`http://api.open-notify.org/iss-pass.json?lat=${obj.latitude}&lon=${obj.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
    } else if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching fly over time. Response: ${body}`), null);
      return;
    } else {
      callback(null, JSON.parse(body).response);
    }
  });
};

let nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coord) => {
      if (error) {
        callback(error, null);
      }
      fetchISSFlyOverTimes(coord, (error, times) => {
        if (error) {
          callback(error, null);
        }
        callback(null, times);
      });
    });
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};
