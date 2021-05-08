# DevilsXPEngine

Taking in webhooks and spiting out XP :tada:

## Info

The current setup is just for GitHub hooks. see the repo to see more milestones and there progress 

## The Setup

```
let xpApi = require("./XPEngineAPI")
let express = require("express");
let app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 3006;

var xpAPIs = new xpApi(app,{callbackFunc : logOutput});

xpAPIs.changeSiteConfig("github", {key : "somekey"});

xpAPIs.setupSiteEndpoints("github");

http.listen(port, () => console.log('listening on port ' + port));

function logOutput(data){
    console.log(`XP : ${data}`);
}

```

> data object result
```
{
    user : "MyGhUserName",
    action : "push",
    xp : 23
  }
```

## Generic settings and info




## Github webhooks

The specifics for GitHub :

`xpAPIs.changeSiteConfig("github", {key : "somekey"});`

the `Key` is your secret webhook key and is used to `validateHmac`

you can also change the url part for the endpoints created

`xpAPIs.changeSiteConfig("github", {baseurl : "somecustomurlpart"});`