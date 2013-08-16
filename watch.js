var fs = require('fs');
var send = require('./send_udp');

var dirname = process.argv[2];

var files = [];

fs.watch(dirname, function (event, filename) {
  if (filename) {
    if (files.indexOf(filename) == -1) {
      files.push(filename);
      monitorFile(dirname + '/' + filename);
    }
  }
});

var monitorFile = function (filename) {
  console.log('starting watch for ' + filename);
  fs.watchFile(filename, function (curr, prev) {
    console.log('the current size is: ' + curr.size);
    console.log('the previous size was: ' + prev.size);
    var stream = fs.createReadStream(filename, {autoClose: true, start: prev.size});
    stream.addListener("data", function (lines) {
      lines = lines.toString('utf-8');
      lines = lines.split("\n");
      for (var i = 0; i < lines.length; i++) {
        if (lines[i].length > 0) {
          console.log('[' + lines[i] + ']');
          send(lines[i]);
        }
      }
    });
  });
}


