import express from 'express';
// import axios from 'axios';
import { getWeatherFrom } from './services/meteo-service.js';

const app = express();
app.use(express.json()); //Middleware

const initiatives = [];

// Mock In-Memory Database
const scientists = [
    { id: 1, name: "Dr. Elena Rostova", department: "Climate", projects: 4 },
    { id: 2, name: "Prof. Marcus Vance", department: "Oceanography", projects: 2 },
    { id: 3, name: "Dr. Aisha Khan", department: "Climate", projects: 7 }
];



app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/about', (req, res, next) => {
  next({msg: "This is my WebApp Class Project"});
});

app.get('/about', (req, res, next) => {
  res.send('This is my WebApp Class Project, but secure');
});


// /greet?name=***&city=***
app.get('/greet', (req, res) => {
    const { name, city } = req.query; // <- Destructuring
  res.send(`Hello ${name}, how is the weather in ${city}`)
});

// /api/scientists?doctor=***
app.get('/api/scientists', (req, res) => {
  const { dept } = req.query;
  /*
  const result = [];
  if (const scientist of scientists){
    if (scientist.department === dept){
      result.push(scientist);
    }
  }
  */
 if (dept){
  const result = scientists.filter((scientist) => scientist.department.toLowerCase() === dept.toLowerCase());
  if (result && result.length > 0){
    return res.json({
      deptScientist: result,
      dept,
      cout: result.length
    });
  } else {
    return res.json( {errorMsg: `No result for department ${dept}`, depts})
  }

 }
 return res.json( { deptScientist: scientists, count: scientists.length});
  
});

// /api/scientists/:id
app.get('/api/scientists/:id/profile/:keyword', (req, res) => {
  const { keyword } = req.params;
  const id = parseInt(req.params.id, 10);
  const scientist = scientists.find((scientist) => scientist.id === id);
  if (!scientist){
    return res.json({
      success: false,
      errorMsg: "No scientist found."
    });
  }
  res.json({
    success: true,
    keyword,
    data: scientist
  });
});

app.get("/api/initiatives", (req,res) => {
  res.json
});

app.post("/api/initiatives", (req,res) => {
  const { title, budget, department } = req.body;
  const initiative = { title, budget, department };
  initiatives.push(initiative);
  res.json({title, budget, department});
});



app.post('/about', (req, res) => {
  res.send('This is still my WebApp Class Project, but secure');
});

app.get("/weatherGDL", async (req, res) => {
  const respString = await getWeatherFrom(20.6597, -103.349, "Guadalajara");
  res.send(respString);
});

app.get("/weatherLSN", async (req, res) => {
  const respString = await getWeatherFrom(46.52, -6.63, "Guadalajara");
  res.send(respString);
});

const cities = {
  GDL : { lat: 20.6597, lon: -103.349 },
  LSN : { lat: 46.52, lon: -6.63 }
};

/*
app.get("/weather/:city", async (req, res, next) => {
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

app.get("/weather/:city", async (req, res, next) => {

    const { city } = req.params;
    if (!city) next(new WeatherError("City code is required.", 400, "/weather/:city"));
    if (!cities[city]) next(new WeatherError("Invalid city code.", 400, "/weather/:city"));
    const {  lat, lon, name } = cities[city];
    const respString = await getWeatherFrom(lat, lon, name);
    res.send(respString);

});

/*
app.all ('/*', (req, res) => {
  res.status(404).send('Route not found');
});
*/


app.use((err, req, res, next) => { 
      console.error(err);
      if (error instanceof WeatherError) {
      const msg = err.message || err.rootCauseClass || "Unknown Error";
      res
        .status(err.statusCode || 500)
        .json({ error: msg, rootCause: err.rootCauseClass  });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
