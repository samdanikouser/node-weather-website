const request = require("request");

const geoweather = (latitude, longitute, location, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=40bac351ba707e4f98ea7ad004892754&query=" +
    latitude +
    "," +
    longitute;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback(
        "There is some error on running the required url,Please check for internet connection",
        undefined
      );
    } else if (response.body.error) {
      callback("Please enter proper required parameters", undefined);
    } else {
      callback(undefined, {
        data:
          response.body.current.weather_descriptions[0] +
          `. Its currently ` +
          response.body.current.temperature +
          ` degree there is ` +
          response.body.current.precip +
          `% chance of rain in ` +
          location,
      });
    }
  });
};

module.exports = geoweather;
