import express from 'express';

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

app.get('/about', (req, res) => {
  res.send('This is my WebApp Class Project');
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

app.post("/api/initiatives", (req,res) => {
  const { title, budget, department } = req.body;
  const initiative = { title, budget, department };
  initiatives.push(initiative);
  res.json({title, budget, department});
});

app.post('/about', (req, res) => {
  res.send('This is still my WebApp Class Project, but secure');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
