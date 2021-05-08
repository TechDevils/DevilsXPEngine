let xpApi = require("./XPEngineAPI")
let express = require("express");
let app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 3006;

var xpAPIs = new xpApi(app,{callbackFunc : logOutput});

xpAPIs.changeSiteConfig("github", {key : "somekey"});
xpAPIs.addOrUpdateProfile({"name" : "test", "low" : 11, "high":21});

xpAPIs.setupSiteEndpoints("github");

http.listen(port, () => console.log('listening on port ' + port));

function logOutput(data){
    console.log(`XP : ${data}`);
}
