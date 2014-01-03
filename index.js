var es = require('event-stream');
var marked = require('marked');

module.exports = function(opt) {

  marked.setOptions(opt || {});

  return es.map(function (file, callback) {

    // Call the transform function with a callback
    file.transform(function(err, buf, cb) {

      // Handle any error
      if(err) throw err;

      // Use the buffered content
      marked(String(buf), function (err, content) {

        // Report any error with the callback
        if (err) {
          cb(err);
        // Send the new buffer content back
        } else {
          cb(null, Buffer(content));
        }

      });
    });

    callback(null, file);
  });

};
