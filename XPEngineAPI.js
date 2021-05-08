// post : 
/*
    setInStone : an exact number of xp
*/

// Quest ?! im already on a quest. A quest to get my swamp bac
let XPEngine = require("./xpEngine");
let {validateHmac} = require("./hmacCheck.js");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
let path = require("path");

let endpointTypes = {
  "betweenInputPoints" : "ghBetweenInputPoints",
  "fixedXpOutput" : "ghFixedXpOutput"
}
//ToDo : add the ability to add bonus xp for actions/events
class XPEngineAPI {
  constructor(expressApp, config) {
    this.app = expressApp;
    this.config = {
      baseUrl: "api",
      key : config.key,
      sites :{
        "github" : {
          validateWebHooks : true,
          key : "",
          baseurl : "gh",
          endpointHandler : setupHandelGithubEndpoint
        }
      },
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
        }
      }
    }
  }

  changeSiteConfig(siteName, {key,validate,baseurl}){
    let section = this.config["sites"][siteName];

    if(section){
      if(key){
        section.key = key;
      }
      if(validate != undefined){
        section.validateWebHooks = validate;
      }
      if(baseurl){
        section.baseurl = baseurl;
      }
    }
  }

  addOrUpdateProfile({name,low,high}){
    this.config["profiles"][name] = {
      low: low,
      high: high
    }
  }

  removeProfile(name){
    if(this.config["profiles"][name]){
      delete this.config["profiles"][name]
    }
  }

  setupSiteEndpoints(name) {
    console.log(`processing endpoints for ${name}`)
    let xp = new XPEngine();

    let configKeys = Object.keys(this.config["profiles"]);

    let baseUrl = this.config["baseUrl"];
    let sitePartUrl = this.config["sites"][name].baseurl;

    let siteEndpointHandler = this.config["sites"][name].endpointHandler

    let availableEndpoints = [];

    for (let i = 0; i < configKeys.length; i++) {
      const configKey = configKeys[i];
      let configSection = this.config["profiles"][configKey]
      let urlPath = `/${baseUrl}/${sitePartUrl}/${configKey}`;
      availableEndpoints.push(urlPath);
      this.app.get(urlPath, (req, res) => {
        siteEndpointHandler(endpointTypes.fixedXpOutput, configSection, xp, req, res,this.config, false);
      })
      this.app.post(urlPath, (req, res) => {
        siteEndpointHandler(endpointTypes.fixedXpOutput, configSection, xp, req, res,this.config);
      })
    }

    var betweenEndpointUrl = `/${baseUrl}/${sitePartUrl}/between/:low-:high`;

    availableEndpoints.push(betweenEndpointUrl);

    this.app.get(betweenEndpointUrl, (req, res) => {
      siteEndpointHandler(endpointTypes.betweenInputPoints, null, xp, req, res,this.config, false);
    })

    this.app.post(betweenEndpointUrl, jsonParser, (req, res) => {
      siteEndpointHandler(endpointTypes.betweenInputPoints, null, xp, req, res,this.config);
    })
    console.log(`completed endpoints for ${name}`);
    console.log(`${availableEndpoints.length} endpoints available`);
    for (let i = 0; i < availableEndpoints.length; i++) {
      const endpoint = availableEndpoints[i];
      console.log(`endpoint : ${endpoint}`);
    }
  }

  currentConfig() {
    return this.config;
  }
}

module.exports = XPEngineAPI;

function setupHandelGithubEndpoint(endpointType, profile, xp, req, res, config, processRequest){

  let {key, callbackFunc} = config;

  let githubEvent = req.headers["x-github-event"];
  let payload = req.body;

  if(processRequest && config["sites"]["githug"].validateWebHooks){
    let hookHash = req.headers["x-hub-signature-256"];
    console.log(githubEvent);

    let validPayload = validateHmac(key,JSON.stringify(payload),hookHash);
    if(!validPayload && hookHash){
      console.log("Invalid hash");
      res.status(204);
      res.send("");
      return;
    }
  }
  let output = {
    user : "",
    action : githubEvent,
    xp : 0
  };

  if(payload){
    output.user = payload.sender.login;
  }

  switch(endpointType){
    case endpointTypes.betweenInputPoints:
        let lowInput = parseInt(req.params.low);
        let highInput = parseInt(req.params.high);
        output.xp = xp.randomXp(lowInput, highInput);
      break;
    case endpointTypes.fixedXpOutput:
        let {
          low,
          high
        } = profile;
        output.xp = xp.randomXp(low, high);
      break;
  }

  res.send(`xp ${output.xp}`);

  if(callbackFunc){
    callbackFunc(output);
  }
}
