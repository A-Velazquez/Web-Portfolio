import express from "express";

const router = express.Router();

const cities = {
  GDL : { lat: 20.6597, lon: -103.349 },
  LSN : { lat: 46.52, lon: -6.63 }
};

router.get("/weatherGDL", async (req, res) => {
  const respString = await getWeatherFrom(20.6597, -103.349, "Guadalajara");
  res.send(respString);
});

router.get("/weatherLSN", async (req, res) => {
  const respString = await getWeatherFrom(46.52, -6.63, "Guadalajara");
  res.send(respString);
});

/*
router.get("/weather/:city", async (req, res, next) => {
  try {
    const { city } = req.params;
    if (!city) throw new Error("City code is required.");
    if (!cities[city]) throw new Error("Invalid city code.");
    const {  lat, lon } = cities[city];
    const respString = await getWeatherFrom(lat, lon, city);
    res.send(respString);
  } catch (error) {
    res.status(400).send("Invalid city code.");
    if (error.message == "City code is required.") {
      res.status(400).send({error : "City code is required."});
    }
    if (error.message == "Invalid city code.") {
      res.status(400).send({error : "Invalid city code."});
    }
      res.status(500).send({error : "Unknown Error."});
  }
});
*/

router.get("/weather/:city", async (req, res, next) => {

    const { city } = req.params;
    if (!city) next(new WeatherError("City code is required.", 400, "/weather/:city"));
    if (!cities[city]) next(new WeatherError("Invalid city code.", 400, "/weather/:city"));
    const {  lat, lon, name } = cities[city];
    const respString = await getWeatherFrom(lat, lon, name);
    res.send(respString);

});

export default router;