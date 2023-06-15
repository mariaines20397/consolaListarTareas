const fs = require('fs');

const path = './database/data.json';

const guardarDB = (data) => {
  fs.writeFileSync(path, data);
};

const leerDB = () => {
  if (fs.existsSync(path)) {
    const info = fs.readFileSync(path, { encoding: 'utf-8' });
    const data = JSON.parse(info);

    return data;
  }
  return null;
};

module.exports = {
  guardarDB,
  leerDB,
};
