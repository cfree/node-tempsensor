const { join } = require('path');
const { readFileSync, readdirSync, statSync } = require('fs');

const isDev = process.env.NODE_ENV && process.env.NODE_ENV === 'development';
const pathPrefix = '/sys/bus/w1/devices';

function getSensors() {
  try {
    const results = readdirSync(pathPrefix)
      .filter(file => statSync(join(pathPrefix, file)).isDirectory())
      .filter(directory => directory !== 'w1_bus_master');

    return results;
  } catch (e) {
    console.error(`Cannot Get Sensor: ${e}`);
    return isDev ? [123] : [];
  }
}

function readData(sensor) {
  try {
    const results = readFileSync(`${pathPrefix}/${sensor}/w1_slave`, 'utf-8');
    return results;
  } catch (e) {
    console.error(`Cannot Read Sensor: ${e}`);
    return isDev ? '1\n2 3 4 5 6 7 8 9 10 100' : null;
  }
}

function parseData(data) {
  if (data) {
    const [, secondLine] = data.split('\n');
    const values = secondLine.split(' ');
    const celsiusTemp = values[9].slice(2) / 1000;

    return isDev ? {
      celsius: 0, fahrenheit: 32,
    } : {
      celsius: celsiusTemp || null,
      fahrenheit: celsiusTemp ? parseInt((celsiusTemp * 1.8) + 32, 10) : null,
    };
  }

  return null;
}

function getTemperature(sensor) {
  const data = readData(sensor);
  return parseData(data);
}

module.exports = {
  getSensors,
  parseData,
  readData,
  getTemperature,
};
