require("dotenv").config();
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderPage(title, content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
</head>
<body>
  <h1>${escapeHtml(title)}</h1>
  ${content}
  <p><a href="/">Back to home</a></p>
</body>
</html>`;
}

function sendError(res, status, message) {
  if (res.headersSent) {
    return;
  }
  res.status(status).send(renderPage("Weather report", `<p>${escapeHtml(message)}</p>`));
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html", { dotfiles: "allow" });
});

app.post("/", (req, res) => {
  const city = (req.body.cityName || "").trim();
  const apiKey = process.env.WEATHER_API_KEY;

  if (!city) {
    return sendError(res, 400, "Please enter a city name.");
  }

  if (!apiKey) {
    return sendError(res, 500, "The weather API key is not configured.");
  }

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    encodeURIComponent(city) +
    "&units=metric&appid=" +
    apiKey;

  https
    .get(url, (apiResponse) => {
      let body = "";

      apiResponse.on("data", (chunk) => {
        body += chunk;
      });

      apiResponse.on("end", () => {
        let data;

        try {
          data = JSON.parse(body);
        } catch (error) {
          return sendError(res, 502, "The weather service returned an invalid response.");
        }

        if (apiResponse.statusCode !== 200) {
          const message =
            data && data.message
              ? data.message
              : "The weather service could not complete the request.";
          const status = apiResponse.statusCode === 404 ? 404 : 502;
          return sendError(res, status, message);
        }

        const weather = data.weather && data.weather[0];

        if (!weather || !data.main || typeof data.main.temp !== "number") {
          return sendError(res, 502, "The weather service returned incomplete data.");
        }

        const cityName = data.name || city;
        const temperature = Math.round(data.main.temp * 10) / 10;
        const description = weather.description || "No description available";
        const capitalisedDescription =
          description.charAt(0).toUpperCase() + description.slice(1);
        const iconUrl =
          "https://openweathermap.org/img/wn/" +
          encodeURIComponent(weather.icon) +
          "@2x.png";

        const content = `
    <p><strong>${escapeHtml(cityName)}</strong></p>
    <img src="${iconUrl}" alt="${escapeHtml(description)}">
    <p>Temperature: ${temperature} &deg;C</p>
    <p>Description: ${escapeHtml(capitalisedDescription)}</p>`;

        res.send(renderPage("Weather report", content));
      });

      apiResponse.on("error", (error) => {
        console.error(error);
        sendError(res, 502, "The connection to the weather service was interrupted.");
      });
    })
    .on("error", (error) => {
      console.error(error);
      sendError(res, 502, "Unable to reach the weather service. Please try again later.");
    });
});

app.use((req, res) => {
  sendError(res, 404, "Page not found.");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on port " + (process.env.PORT || 3000));
});
