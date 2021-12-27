const TPLSmartDevice = require('tplink-lightbulb')
const { Client } = require('tplink-smarthome-api');



// // scan for available wifi
// const light = new TPLSmartDevice('10.0.0.200')
// light.listwifi()
//   .then(info => {
//     console.log(info)
//   })

const client = new Client();

// Look for devices, log to console, and turn them on
client.startDiscovery().on('device-new', (device) => {
  device.getSysInfo().then(console.log);
  device.setPowerState(true);
});

// turn first discovered light off
const scan = TPLSmartDevice.scan( "", "255.255.255.255")
  .on('light', light => {
    light.power(false)
      .then(status => {
        console.log(status)
        scan.stop()
      })
      .catch(err => console.log(err))
  })