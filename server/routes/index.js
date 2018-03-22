let express = require('express');
const fs = require('fs');
const path = require('path');
let api = express.Router();

module.exports = app => {
  //подключение всех под-маршрутов, описанных в файлах из папки './api/'
  fs.readdirSync(path.join(__dirname, './api/')).forEach(route => {
    if (route.indexOf('.route.')) {
      require('./api/' + route)(api);
    }
  });

  //подключение под-маршрутов к маршруту */api
  app.use('/api', api);
};