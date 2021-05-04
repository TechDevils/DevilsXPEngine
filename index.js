// post : 
/*
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
  },
  text: {
    low: 5,
    high: 1000
  }
}

let configKeys = Object.keys(config);

for (let i = 0; i < configKeys.length; i++) {
  const configKey = configKeys[i];
  app.get(`/api/${configKey}`, (req, res) => {
    fixedXpOutput(configKey,req,res);
  })
  app.post(`/api/${configKey}`, (req, res) => {
    fixedXpOutput(configKey,req,res);
  })
}

app.get('/api/between/:low-:high', (req, res) => {
  betweenInputPoints(req,res);
})

app.post('/api/between/:low-:high', (req, res) => {
  console.log(req.headers["x-github-event"])
  betweenInputPoints(req,res);
})

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