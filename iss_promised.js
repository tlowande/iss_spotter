
const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org/?format=json')
}

const fetchCoordsByIP = function(string) {
  return request('https://ipvigilante.com/' + JSON.parse(string).ip)
}

const fetchISSFlyOverTimes = function(coord) {
  const {latitude, longitude } = JSON.parse(coord).data
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`)
}

let nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(body => {
      return JSON.parse(body).response
    })
}

  module.exports = {
    // fetchMyIP,
    // fetchCoordsByIP,
    // fetchISSFlyOverTimes,
    nextISSTimesForMyLocation
  };