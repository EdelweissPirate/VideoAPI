const Service = require('node-windows').Service;

// Create a new service object
const svc = new Service({
    name:'VideoAPI_Service',
    description: 'Mobius VideoAPI Service.',
    script: require("path").join(__dirname, "../server.js"),
    workingDirectory: require("path").join(__dirname, "..")
});

svc.on('stop ',function(){
    console.log(svc.name + " is stopped!.")
});

svc.on('alreadyuninstalled ',function(){
    console.log(svc.name + " is already uninstalled!.")
});

svc.on('uninstall',function(){
    console.log(svc.name + " is uninstalled.")
});

try {
    svc.stop();
} catch (error) {
    console.log("Error stopping: ", error);
}

try {
    svc.uninstall();
} catch (error) {
    console.log("Error uninstalling: ", error);
}

