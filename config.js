
/**
 * Module dependencies.
 */
var express = require('express'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    http = require('http'),
    path = require('path');

module.exports = function() {
  var app = express();

  // all environments
  app.set('port', process.env.PORT || 3030);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');
  app.use(favicon("./public/images/favicon.png"));
  app.use(bodyParser());
  app.use(methodOverride());
  app.use(express.static(path.join(__dirname, './public/')));

  app.use(errorHandler());

  return app;
}();