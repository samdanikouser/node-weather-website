console.log("cient side js file load");

const form = document.querySelector("form");
const button = document.querySelector("button");
const userInput = document.querySelector("input");
const error = document.querySelector("#error");
const datatext = document.querySelector("#data");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch("http://localhost:8000/weather?address=" + userInput.value).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          error.textContent = data.error;
        } else {
          error.textContent = "";
          datatext.textContent = data.forecast;
        }
      });
    }
  );
});
