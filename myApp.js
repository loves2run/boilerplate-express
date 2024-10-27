const bodyParser = require('body-parser');
let express = require('express');
require('dotenv').config();

let app = express();

//use body-parser to Parse POST Request
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Route-level request logger middleware
app.use(function(req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});

app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});


app.get('/json', (req, res) => {

   let response = {"message": "Hello json"};

   if(process.env.MESSAGE_STYLE === "uppercase") {
    response.message = response.message.toUpperCase();
   }

   res.json(response);
});

//chain middleware to create a time server --> serves up the time as a json object
app.get('/now', (req,res,next) => {
    req.time = new Date().toString();
    next();
}, (req,res) => {
    res.json({ time: req.time });
});

//get route parmater input from the client... THIS IS NOT MIDDLEWARE!!!! IT's A ROUTE HANDLER
app.get('/:word/echo', (req,res) => {
    const word = req.params.word;
    res.json({echo: word});
});

//get query parameter input from the client
app.get('/name', (req,res) => {
    const first = req.query.first;
    const last = req.query.last;
    res.json({name: `${first} ${last}`});
});


//Get data from POST request
app.post('/name' , (req , res)=>{
    const first = req.body.first;
    const last = req.body.last;
    res.json({name: `${first} ${last}`});
})






















 module.exports = app;
