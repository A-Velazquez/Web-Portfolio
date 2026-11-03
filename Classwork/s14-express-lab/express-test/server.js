import express from 'express';
// import axios from 'axios';
import { getWeatherFrom } from './services/meteo-service.js';
import { WeatherError } from './errors/weather-error.js';
import weatherRoutes from './routes/weatherRoutes.js';
import { createUser, findUser, findUsers } from './services/user-service.js';


const app = express();
app.use(express.json()); //Middleware

const initiatives = [];
// Load environment variables from .env file
loadEnvFile();
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbName = "WebClass";

const mongoUrl = `mongodb+srv://${dbUser}:${dbPass}@cluster0.em6w7.mongodb.net/${dbName}`;
connectDB(mongoUrl);

// Create a form and save it on the database. The form should have the following fields: username, name, email, password. The form should be submitted to the server and saved in the database. The server should return a success message if the form is saved successfully.
app.post(/"user", (req, res) => {
  const { username, name, email, password } = req.body;
  createUser({ username, name, email, password }
  
  )

// Here ends the mongoDB connection code. The rest of the code is for the Express server and routes.

// Mock In-Memory Database
const scientists = [
    { id: 1, name: "Dr. Elena Rostova", department: "Climate", projects: 4 },
    { id: 2, name: "Prof. Marcus Vance", department: "Oceanography", projects: 2 },
    { id: 3, name: "Dr. Aisha Khan", department: "Climate", projects: 7 }
];

const protect = (req, res, next) => {
  const  { token } = req.headers;
  if (!token  || token !== "mysecrettoken") {
    return res.status(401).json({ error: 'Unauthorized access' });
  }
  next();
}



app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/about', (req, res, next) => {
  req._internalMsg = "This is my WebApp Class Project";
  next(`Second Endpoint. ${req._internalMsg}`);
},
(req, res) => {
  res.send('This is my WebApp Class Project, but secure');
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

app.use("/api/weather", protect ,weatherRoutes);


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
