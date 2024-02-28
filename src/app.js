const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");

const geolocation = require("./utils/geolocation");
const weather = require("./utils/weather");
const root_dir = path.join(__dirname, "../public/");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);
app.use(express.static(root_dir));

app.get("", (req, resp) => {
  resp.render("index", {
    title: "Welcome",
    name: "Samdani",
  });
});

app.get("/about", (req, resp) => {
  resp.render("about", {
    name: "Samdani",
    title: "About",
  });
});

app.get("/help", (req, resp) => {
  resp.render("help", {
    name: "Samdani",
    title: "Help",
    content: "This page is used to find any help related to the site",
  });
});

app.get("/weather", (req, resp) => {
  if (!req.query.address) {
    return resp.send({ error: "please enter the address" });
  } else {
    geolocation(
      req.query.address,
      (errors, { latitude, longititude, location } = {}) => {
        if (errors) {
          resp.send({
            error: errors,
          });
        } else
          weather(latitude, longititude, location, (error, datas) => {
            if (error) {
              resp.send({
                error: error,
              });
            } else {
              resp.send({
                title: "Weather app",
                location: location,
                address: req.query.address,
                forecast: datas.data,
              });
            }
          });
      }
    );
  }
});

app.get("/help/*", (req, resp) => {
  resp.render("404", {
    title: "Not found",
    name: "samdani",
    error: "Help article not found",
  });
});

app.get("*", (req, resp) => {
  resp.render("404", {
    title: "404",
    name: "samdani",
    error: "page not found",
  });
});

app.listen(8000, () => {
  console.log("server is up and running in port 8000");
});
