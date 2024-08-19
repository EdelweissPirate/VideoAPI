const Service = require('node-windows').Service;

// Create a new service object
const svc = new Service({
    name:'VideoAPI_Service',
    description: 'Mobius VideoAPI Service.',
    script: require("path").join(__dirname, "../server.js"),
    workingDirectory: require("path").join(__dirname, "..")
});

try {
    svc.start();
    console.log(svc.name + " Started!");
} catch (error) {
    console.log("Error starting: ", error);
}