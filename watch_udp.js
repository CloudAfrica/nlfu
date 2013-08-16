var fs = require('fs');

//fs.watch('/tmp', function (event, filename) {
//  console.log('event is: ' + event);
//  if (filename) {
//    console.log('filename provided: ' + filename);
//  } else {
//    console.log('filename not provided');
//  }
//});

var filename = '/tmp/message.text';
var dgram = require('dgram');
var client = dgram.createSocket("udp4");

fs.watchFile(filename, function (curr, prev) {
  console.log('the current size is: ' + curr.size);
  console.log('the previous size was: ' + prev.size);

  var stream = fs.createReadStream(filename, {autoClose: true, start: prev.size}); //, {start: start, end: stats.size});

  stream.addListener("data", function (lines) {
    lines = lines.toString('utf-8');
    lines = lines.split("\n");
    for (var i = 0; i < lines.length; i++) {
      if (lines[i].length > 0) {
        console.log('[' + lines[i] + ']');
      }
    }
  });
});


