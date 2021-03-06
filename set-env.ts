const fs = require('fs');
// Configure Angular `environment.ts` file path
const targetPath = './src/environments/environment.ts';
// Load node modules
const dotenv = require('dotenv');
dotenv.config();

console.log(`Working Dir: ${process.cwd()}`);
console.log(`File Path: ${__dirname}`);
process.chdir(__dirname);
console.log('Files: ');

fs.mkdirSync('./src/environments', { recursive: true }, (err) => {
  if (err) throw err;
});

fs.readdirSync('./src').forEach((file) => {
  console.log(file);
});

// `environment.ts` file structure
const envConfigFile = `export const environment = {
   mqtt_hostname: '${process.env.MQTT_HOSTNAME || 'broker.mqttdashboard.com'}',
   video_api: '${process.env.VIDEO_API || 'http://localhost:8000/live/'}',
   production: ${process.env.PRODUCTION || true}
};
`;
console.log(
  `The file 'environment.ts' ( ${targetPath} ) will be written with the following content: \n`
);
console.log(envConfigFile);

fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(
      `Angular environment.ts file generated correctly at ${targetPath} \n`
    );
  }
});
