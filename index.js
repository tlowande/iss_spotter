const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation} = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });


// fetchCoordsByIP('66.207.199.230', (error, coord) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It works! The coordinates are:', coord);
// });

// fetchISSFlyOverTimes({latitude: '43.63830', longitude: '-73.4301'}, (error, times) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It works! The coordinates are:', times);
// });

nextISSTimesForMyLocation((error, pastTimes) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  for (let e of pastTimes)
    console.log(`Next pass at ${new Date((Number(e.risetime)) * 1000)} GMT-0700 (Pacific Daylight Time) for ${e.duration} seconds!`);
});