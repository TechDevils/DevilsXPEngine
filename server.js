let xpApi = require("./XPEngineAPI")
let express = require("express");
let app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 3006;

new xpApi(app,{callbackFunc : logOutput, key : "some key"}).setup();

http.listen(port, () => console.log('listening on port ' + port));

function logOutput(data){
    console.log(`XP : ${data}`);
}
