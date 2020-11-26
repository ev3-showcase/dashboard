var LineByLineReader = require('line-by-line');
import { environment } from '../src/environments/environment';
var mqtt = require('mqtt');

/**
 * MQTT Setup
 */
var connectionString = 'ws://' + environment.mqtt_hostname + ':' + 80 + '/mqtt';
console.log('Trying to connect to: ' + connectionString);
var client = mqtt.connect(connectionString);
let mockCounter = 0;

client.on('error', (err) => {
  console.error(err);
});

client.on('connect', function () {
  mockLidar();
  mockSensor();
  mockIp();
  console.log('Start Sending...');
});

/**
 * Lidar
 */
let mockLidarCount = 0;
function mockLidar() {
  let lr = new LineByLineReader('./data/lidar.csv');

  lr.on('error', function (err) {
    console.error(err);
  });

  lr.on('line', function (line) {
    lr.pause();
    if (mockLidarCount != 0) {
      client.publish(
        'car-cloudhub/stats/lidar',
        (line as string).replace(/[\[\]\"]/g, ''),
        {
          qos: 1,
          retain: false,
        }
      );
    }
    mockLidarCount++;

    setTimeout(function () {
      lr.resume();
    }, 20);
  });

  lr.on('end', function () {
    mockLidarCount = 0;
    mockLidar();
  });
}

/**
 * Sensor Data
 */

let mockSensorCount = 0;
function mockSensor() {
  let lr = new LineByLineReader('./data/sensor.csv');

  lr.on('error', function (err) {
    console.error(err);
  });

  lr.on('line', function (line) {
    lr.pause();
    if (mockSensorCount != 0) {
      client.publish('car-cloudhub/stats/log', line, {
        qos: 1,
        retain: false,
      });
    }
    mockSensorCount++;

    setTimeout(function () {
      lr.resume();
    }, 1000);
  });

  lr.on('end', function () {
    mockSensorCount = 0;
    mockSensor();
  });
}

/**
 * Ip
 */

function mockIp() {
  client.publish('car-cloudhub/admin/ip', '127.0.0.1', {
    qos: 1,
    retain: true,
  });
  setTimeout(function () {
    mockIp();
  }, 1000);
}
