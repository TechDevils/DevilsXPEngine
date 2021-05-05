// post : 
/*
    setInStone : an exact number of xp
*/

// Quest ?! im already on a quest. A quest to get my swamp bac
let XPEngine = require("./xpEngine");
let {validateHmac} = require("./hmacCheck.js");
let express = require("express");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
let path = require("path");

let endpointTypes = {
  "betweenInputPoints" : "betweenInputPoints",
  "fixedXpOutput" : "fixedXpOutput"
}

class XPEngineAPI {
  constructor(expressApp, config) {
    this.app = expressApp;
    this.config = {
      baseUrl: "api",
      key : config.key,
      callbackFunc : config.callbackFunc,
      validateHash : true,
      profiles: {
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
    }
  }

  setup() {
    let xp = new XPEngine();

    let configKeys = Object.keys(this.config["profiles"]);

    for (let i = 0; i < configKeys.length; i++) {
      const configKey = configKeys[i];
      let configSection = this.config["profiles"][configKey]
      let urlPath = path.join(this.config["baseUrl"],configKey)
      this.app.get(urlPath, (req, res) => {
        setupHandelEndpoint(endpointTypes.fixedXpOutput, configSection, xp, req, res,this.config);
      })
      this.app.post(urlPath, (req, res) => {
        setupHandelEndpoint(endpointTypes.fixedXpOutput, configSection, xp, req, res,this.config);
      })
    }

    this.app.get('/api/between/:low-:high', (req, res) => {
      setupHandelEndpoint(endpointTypes.betweenInputPoints, null, xp, req, res,this.config);
    })

    this.app.post('/api/between/:low-:high', jsonParser, (req, res) => {
      setupHandelEndpoint(endpointTypes.betweenInputPoints, null, xp, req, res,this.config);
    })
  }

  currentConfig() {
    return this.config;
  }
}

module.exports = XPEngineAPI;

function setupHandelEndpoint(endpointType, profile, xp, req, res, config){

  let {profiles, key, callbackFunc} = config;

  let hookHash = req.headers["x-hub-signature-256"];
  console.log(req.headers["x-github-event"]);

  let payload = req.body;
  let validPayload = validateHmac(key,JSON.stringify(payload),hookHash);
  if(!validPayload && hookHash){
    console.log("Invalid hash");
    res.status(204);
    res.send("");
    return;
  }

  let output = 0;

  switch(endpointType){
    case "betweenInputPoints":
        let lowInput = parseInt(req.params.low);
        let highInput = parseInt(req.params.high);
        output = xp.randomXp(lowInput, highInput);
      break;
    case "fixedXpOutput":
        let {
          low,
          high
        } = profiles[profile];
        output = xp.randomXp(low, high);
      break;
  }

  res.send(`xp ${output}`);

  if(callbackFunc){
    callbackFunc(output);
  }
}
