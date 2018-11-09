const path = require('path');


module.exports = function(app){

  app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../public/login.html'));
  });

  app.get('/chat', function(req, res){
    res.sendFile(path.join(__dirname, '../public/chat.html'));
  });
}