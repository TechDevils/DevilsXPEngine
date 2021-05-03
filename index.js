// post : 
/*
    Low : configured in settings how much xp
    medium : configured in settings how much xp
    high : configured in settings how much xp

    Random : with from -> to will give xp between those numbers

    setInStone : an exact number of xp
*/

// Quest ?! im already on a quest. A quest to get my swamp bac
let XPEngine = require("./xpEngine");
let express = require("express");
var app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 3006;

var xp = new XPEngine();

var config = {
  low: {
    low: 1,
    high: 10
  },
  medium: {
    low: 10,
    high: 30
  },
  high: {
    low: 30,
    high: 100
  }
}

app.get('/api/low', (req, res) => {
  fixedXpOutput("low",req,res);
})
app.get('/api/medium', (req, res) => {
  fixedXpOutput("medium",req,res);
})
app.get('/api/high', (req, res) => {
  fixedXpOutput("high",req,res);
})
app.get('/api/between/:low-:high', (req, res) => {
  betweenInputPoints(req,res);
})

app.post('/api/between/:low-:high', (req, res) => {
  betweenInputPoints(req,res);
})

console.log(xp.randomXp(6, 10));
http.listen(port, () => console.log('listening on port ' + port));

function fixedXpOutput(profile,req,res){
  let {
    low,
    high
  } = config[profile];
  let output = xp.randomXp(low, high);
  res.send(`xp ${output}`)
}

function betweenInputPoints(req,res){
  let lowInput = parseInt(req.params.low);
  let highInput = parseInt(req.params.high);
  //console.log(`lowInput : ${lowInput} ${typeof(lowInput)}`)
  let output = xp.randomXp(lowInput, highInput);
  res.send(`xp ${output} low : ${lowInput} high : ${highInput}`)
}