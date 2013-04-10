/*
 * grunt-browserify
 * https://github.com/pix/grunt-browserify
 *
 * Copyright (c) 2012 Camille Moncelier
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {

  function fail(err) {
    grunt.log.error();
    console.error(err);
    grunt.fail.fatal('Browserify failed');
  }

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md
  // ==========================================================================
  // TASKS
  // ==========================================================================
  grunt.registerMultiTask('browserify', 'Your task description goes here.', function () {
    var browserify = require('browserify');
    var config = grunt.config.get(this.name)[this.target];

    try {

      var b = browserify(config.options || {});

      if (config.hook) {
        config.hook.call(this, b);
      }

      (config.requires || []).forEach(function (req) {
        grunt.verbose.writeln('Adding "' + req + '" to the required module list');
        b.require(req);
      });

		grunt.file.expand({filter: 'isFile'}, config.entries || []).forEach(function (filepath) {
        grunt.verbose.writeln('Adding "' + filepath + '" to the entry file list');
        b.addEntry(filepath);
      });

      var files = grunt.file.expand({filter: 'isFile'}, config.prepend || []);
      var src = files
			.map(function (filepath) {
				return grunt.file.read(filepath);
			})
			.join('');
      b.prepend(src);

      files = grunt.file.expand({filter: 'isFile'}, config.append || []);
      src = files
			.map(function (filepath) {
				return grunt.file.read(filepath);
			})
			.join('');
      b.append(src);

      var bundle = b.bundle();
      if (!b.ok) {
        fail('Browserify bundle() failed.');
      }

      grunt.file.write(config.target || this.target, bundle);

    } catch (err) {
      fail(err);
    }

  });

};
