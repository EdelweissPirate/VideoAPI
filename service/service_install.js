const Service = require('node-windows').Service;

// Create a new service object
const svc = new Service({
    name:'VideoAPI_Service',
    description: 'Mobius VideoAPI Service.',
    script: require("path").join(__dirname, "../server.js"),
    workingDirectory: require("path").join(__dirname, "..")
});

svc.on('alreadyinstalled ',function(){
    console.log(svc.name + " is already installed!.")
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
    console.log(svc.name + " is installed.")

    try {
        svc.start();
        console.log(svc.name + " Started!");
    } catch (error) {
        console.log("Error installing: ", error);
    }
});

svc.install();