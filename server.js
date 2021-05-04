let xpApi = require("./XPEngineAPI")
let express = require("express");
let app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 3006;

new xpApi(app).setup();

http.listen(port, () => console.log('listening on port ' + port));