// post : 
/*
    setInStone : an exact number of xp
*/

// Quest ?! im already on a quest. A quest to get my swamp bac
let XPEngine = require("./xpEngine");
let express = require("express");
let path = require("path");

class XPEngineAPI {
  constructor(expressApp, config) {
    this.app = expressApp;
    this.config = {
      baseUrl: "api",
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
        fixedXpOutput(xp, configSection, req, res);
      })
      this.app.post(urlPath, (req, res) => {
        fixedXpOutput(xp, configSection, req, res);
      })
    }

    this.app.get('/api/between/:low-:high', (req, res) => {
      betweenInputPoints(xp, req, res);
    })

    this.app.post('/api/between/:low-:high', (req, res) => {
      console.log(req.headers["x-github-event"])
      betweenInputPoints(req, res);
    })
  }

  currentConfig() {
    return this.config;
  }
}

module.exports = XPEngineAPI;


function fixedXpOutput(xp, profile, req, res) {
  let {
    low,
    high
  } = profile;
  let output = xp.randomXp(low, high);
  res.send(`xp ${output}`)
}

function betweenInputPoints(xp, req, res) {
  let lowInput = parseInt(req.params.low);
  let highInput = parseInt(req.params.high);
  //console.log(`lowInput : ${lowInput} ${typeof(lowInput)}`)
  let output = xp.randomXp(lowInput, highInput);
  res.send(`xp ${output} low : ${lowInput} high : ${highInput}`)
}