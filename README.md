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
On initial setup the endpoints will be outputted to the `console`

```
4 endpoints available
endpoint : /api/gh/low
endpoint : /api/gh/medium
endpoint : /api/gh/high
endpoint : /api/gh/between/:low-:high
```

The `between/:low-:high` is available endpoint and can be used like this :

`/api/gh/between/5-20`

The other endpoints are fixed `profiles` that can be set and altered the defaults are set as so 

```
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
```

Add a new profile endpoint.

`xpAPIs.addOrUpdateProfile({"name" : "test", "low" : 11, "high":21});`

Update a profile endpoint.

`xpAPIs.addOrUpdateProfile({"name" : "low", "low" : -3, "high":4});`


## Github webhooks

The specifics for GitHub :

`xpAPIs.changeSiteConfig("github", {key : "somekey"});`

the `Key` is your secret webhook key and is used to `validateHmac`

you can also change the url part for the endpoints created

`xpAPIs.changeSiteConfig("github", {baseurl : "somecustomurlpart"});`