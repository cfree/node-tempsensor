const { join } = require('path');
const { readFileSync, readdirSync, statSync } = require('fs');

const pathPrefix = '/sys/bus/w1/devices';

function getSensors() {
	// Serial: 28-02131a3091aa  
  return readdirSync(pathPrefix)
    .filter(file => statSync(join(pathPrefix, file)).isDirectory())
    .filter(directory => directory !== 'w1_bus_master');
}

function readData(sensor) {
	//Read sensor: location = /sys/bus/w1/devices + ds18b20 + /w1_slave
  return readFileSync(`${pathPrefix}/${sensor}/w1_slave`, 'utf-8');
}

function parseData(data) {
  const [,secondLine] = data.split('\n');
  const values = secondLine.split(' ');
  const celsiusTemp = values[9].slice(2) / 1000;
  
  return {
    celsius: celsiusTemp ? celsiusTemp : null,
    fahrenheit: celsiusTemp ? parseInt((celsiusTemp * 1.8) + 32, 10) : null,
  };
}

function getTemperature(sensor) {
  const data = readData(sensor);
  return parseData(data);
}

module.exports.getSensors = getSensors;
module.exports.parseData = parseData;
module.exports.readData = readData;
module.exports.getTemperature = getTemperature;
