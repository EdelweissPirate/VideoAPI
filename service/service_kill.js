const Service = require('node-windows').Service;

// Create a new service object
const svc = new Service({
    name:'VideoAPI_Service',
    description: 'Mobius VideoAPI Service.',
    script: require("path").join(__dirname, "../server.js"),
    workingDirectory: require("path").join(__dirname, "..")
});

try {
    svc.stop();
    console.log(svc.name + " Stopped!");
} catch (error) {
    console.log("Error installing: ", error);
}