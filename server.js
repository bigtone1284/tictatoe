// Express Boiler-Plate

var express = require("express");
var app = express();

app.set('port', (process.env.PORT || 3000));
app.set("view options", {
  layout: false
});

app.use(express.static(__dirname + "/public"));

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});