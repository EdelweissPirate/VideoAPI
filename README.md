<center>
  <h1>VideoAPI</h1>
  <h6>https | node | express | node-windows</h6>
</center>

## What it is?
<p>
It is a serverless function API created using NodeJS and the Express node library. 
</p>

## Why it is?
<p>
It's purpose is to prevent access to proprietary videos by unauthorised sources i.e non-customers. 
</p>

## How it works?
<p>
It works by utilising a reverse-proxy on the server that reroutes certain urls to the app. The app then performs it's own https decryption as well as in-house authorisation to prevent unwanted access. If the checks are successful the video is passed from the server to the client, to be viewed by the authorised user. 
</p>

## How to troubleshoot: 

*API files found on server in LearningZone folder -> VideoAPI folder*

#### certificate files 

<ul>
    <li>
        <strong>server.cer</strong> (may appear as just 'server' in the folder due to not showing file extension.)
    </li>
    <li>
        <strong style=>server.key</strong>
    </li>
</ul>

#### Forbidden (403) status

<p>
If you receive a 'Forbidden', 'Unauthorised', or 403 status message when trying to access the videos it is likely that the SSL certificate being used for the app's HTTPS decryption has expired or otherwise become unusable. 
</p>

<p>
This is processed by the app using two files within it's 'ssl' folder; server.cer and server.key respectively. Any certificate and key PAIR can be used. That means anyone can generate a certificate to be used if needed and the only consideration to be made is that the key and certficate correspond with eachother i.e it's the right key for the certificate. IF EITHER OF THESE FILES ARE TO BE CHANGED/REPLACED/UPDATED, BOTH MUST BE CHANGED/REPLACED/UPDATED TOGETHER.  If you are provided only a .cer file from a certificate provider, it is possible to generate a new key for it using openssl on the command line. Do the following on a local machine, not the server, and then move the renamed files over: (openssl instructions). REMINDER: The .cer and .key files MUST be renamed to server unless changes are made to the app's source code to reflect the new file names.
</p>

### Check Service is running

<p>
check that VideoAPI_Service in services.msc has the 'Running' status.
</p>
<p>
If not, click the service in the list and click 'Start' in the contextual menu that appears.
If it is appearing as running but isn't working, right click the service in the list and select 'Restart'. You can also try rebooting the server but try here first as to minimise disruption to server access.
</p>

### Checking via API

<p>
CAVEAT: If the videos cannot be accessed it is likely this API call will fail and therefore should likely be a last resort while troubleshooting. The entire basis of the app runs on API calls and so if one is down they will all be down. This section is included for fringe issues and cataloguing purposes.
</p>

<p>
If the service is showing as running but issues persist, you can check if the app can speak to the internet by sending a simple API call. This can be done in various ways. I recommend using Visual Studio Code:

https://code.visualstudio.com/download

and then installing the .rest add-on: 

https://marketplace.visualstudio.com/items?itemName=humao.rest-client

or possibly the purpose built software 'Postman':
https://www.postman.com/downloads/

Postman may be more complex if not familiar with API calls. 
</p>

### API usage

<p>
Communicate with the app by sending API requests. See server.js for all available routes. 
</p>

*note: the video name query sent in the getVideo API request must contain the language and folder name of the video. see getVideo example below.* 

#### Example api calls

##### test api
```GET https://localhost:PORTNUMBER/api```
<br>
```content-type: application/json```

##### getVideo
```GET https://localhost:3001/api/getVideo?videoName=English/VACATI/ARP-L_LESSON_2_IMPLEMENTATION_PART_1```
<br>
```content-type: application/json```

## Developer stuff:

#### web-config

<p>
Ensure url is correct in web.config file e.g
</p>

```<action type="Rewrite" url="https://localhost:3001/{R:0}" />```

### App as Windows Service
<p>
Utilising node-windows package the app is being ran as a windows service as to ensure it is running despite server restarts.
</p> 
<p>
Service directory contains scripts for setting up app as window service. Can be ran as npm commands:
</p>

#### Service Commands
- ```npm run install``` - installs and starts app as service.
- ```npm run stop``` - stops service from running.
- ```npm run wake``` - starts service.
- ```npm run remove``` - uninstalls and stops service.

### package.json
<p>
Check package.json file matches below
</p>

<code>
{
  "name": "video-api",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "node .",
    "install": "node service/service_install.js",
    "remove": "node service/service_remove.js",
    "wake": "node service/service_wake.js",
    "stop": "node service/service_kill.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2",
    "express-async-handler": "^1.2.0",
    "node-windows": "^1.0.0-beta.8"
  }
}




</code>


