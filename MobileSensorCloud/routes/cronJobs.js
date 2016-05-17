var waterLevelSensor = require('../routes/waterLevelSensor');
var streamFlowSensor = require('../routes/streamFlowSensor');
var streamHeightSensor = require('../routes/streamHeightSensor');
var waterTemperatureSensor = require('../routes/waterTemperatureSensor');
var waveHeightSensor = require('../routes/waveHeightSensor');
var windSpeedAndDirection = require('../routes/windSpeedAndDirection');



exports.first_job = {

    after: {                // Configuring this job to run after this period.
        seconds: 0,
        minutes:30,
        hours: 0,
        days: 0
    },
    job: function () {
        console.log("first_job");
        waterLevelSensor.mine();
        streamHeightSensor.mine();
        streamFlowSensor.mine();
        waterTemperatureSensor.mine();
        waveHeightSensor.mine();
        windSpeedAndDirection.mine();
    },
    spawn: true
}


