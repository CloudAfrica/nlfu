var dgram = require('dgram');
var client = dgram.createSocket("udp4");

module.exports = function (s) {

  var message = new Buffer(s);

  client.send(message, 0, message.length, 9999, "192.168.6.52", function (err, bytes) {
    client.close();
  });

}