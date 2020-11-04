const fs = require('fs');
// Configure Angular `environment.ts` file path
const targetPath = './src/environments/environment.ts';
// Load node modules
const dotenv = require('dotenv');
dotenv.config();
// `environment.ts` file structure
const envConfigFile = `export const environment = {
   mqtt_hostname: '${process.env.MQTT_HOSTNAME || 'broker.mqttdashboard.com'}',
   mqtt_port: ${process.env.MQTT_PORT || 8000},
   video_api: '${process.env.VIDEO_API || 'http://localhost:8000/live/'}',
   production: ${process.env.PRODUCTION || true}
};
`;
console.log(
  `The file 'environment.ts' ( ${targetPath} ) will be written with the following content: \n`
);
console.log(envConfigFile);
fs.mkdir('./src/environments', { recursive: true }, (err) => {
  if (err) throw err;
});
fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(
      `Angular environment.ts file generated correctly at ${targetPath} \n`
    );
  }
});
