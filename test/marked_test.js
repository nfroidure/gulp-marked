'use strict';
/* globals describe, it */
var gulp = require('gulp'),
  expect = require('chai').expect,
  marked = require('../'),
  markedjs = require('marked'),
  es = require('event-stream'),
  fs = require('fs'),
  path = require('path');

describe('gulp-marked markdown conversion', function() {

  describe('gulp-marked', function() {
    it('should convert my files', function(done) {
      var filename = path.join(__dirname, './fixtures/data.md');
      var markdown = fs.readFileSync(filename, { encoding: 'utf8' });

        gulp.src(filename, {buffer: false})
          .pipe(marked())
          .pipe(es.map(function(file) {
            // Get the buffer to compare results
            file.transform(function(err, buf, cb) {
              markedjs(markdown, function (err, content) {
                expect(String(buf)).to.equal(content);
                cb(null, buf);
                done();
              });
            });
          }));

    });
  });
});
