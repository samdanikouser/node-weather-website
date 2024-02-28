const request = require("request");

const getEnvData = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoic2FtZGFuaSIsImEiOiJjbHN4Nmhva28xbzFvMmtxc285Nzl5dm1hIn0.dpQKuPLO9EpudRrd_bDttw&limit=1";
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback(
        "There is some error on running the required url,Please check for internet connection",
        undefined
      );
    } else if (response.body.features.length === 0) {
      callback("Please enter proper required parameters", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longititude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = getEnvData;
