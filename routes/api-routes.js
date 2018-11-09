const db = require('../model');
const RestfulAPI = require('./RestClass');
module.exports = function (app) {
  
  const createMessage = new RestfulAPI('chat', app, db.Message);
  createMessage.create();

  const getMessage = new RestfulAPI('api/chat', app, db.Message);
  getMessage.findAll();

  const createPrivate = new RestfulAPI('api/private', app, db.Chat);
  createPrivate.create();
};