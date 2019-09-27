// const fetchMyIP = require('./iss_promised');

const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation} = require('./iss_promised');


// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(body => console.log(body));

nextISSTimesForMyLocation()
  .then(time => {
    for (let e of time) {
      console.log(`Next pass at ${new Date((Number(e.risetime)) * 1000)} GMT-0700 (Pacific Daylight Time) for ${e.duration} seconds!`)
    };
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });