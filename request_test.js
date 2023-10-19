const axios = require("axios");

const n = 1800; // Number of requests per second
const apiUrl = "http://localhost:8001/product/all"; // Replace with your API endpoint
const requestInterval = 1000 / n; // Calculate the interval in milliseconds

function makeRequest() {
  axios
    .get(apiUrl)
    .then((response) => {
      console.log("Request successful:", response.status);
    })
    .catch((error) => {
      console.error("Request failed:", error.message);
    });
}

// Set up an interval to make requests
const intervalId = setInterval(makeRequest, requestInterval);

// To stop the requests after a specific duration (e.g., 10 seconds)
const durationInSeconds = 1;
setTimeout(() => {
  clearInterval(intervalId);
  console.log(`Stopped making requests after ${durationInSeconds} seconds.`);
}, durationInSeconds * 1000);
