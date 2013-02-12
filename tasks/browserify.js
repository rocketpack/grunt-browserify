/*
 * grunt-browserify
 * https://github.com/pix/grunt-browserify
 *
 * Copyright (c) 2012 Camille Moncelier
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md
  // ==========================================================================
  // TASKS
  // ==========================================================================
  grunt.registerMultiTask('browserify', 'Your task description goes here.', function () {
    var browserify = require('browserify');
    var config = grunt.config.process(this.name)[this.target];

    try {
      
      var b = browserify(config.options || {});

      if (config.hook) {
        config.hook.call(this, b);
      }

      (config.requires || []).forEach(function (req) {
        grunt.verbose.writeln('Adding "' + req + '" to the required module list');
        b.require(req);
      });

      grunt.file.expandFiles(config.entries || []).forEach(function (filepath) {
        grunt.verbose.writeln('Adding "' + filepath + '" to the entry file list');
        b.addEntry(filepath);
      });

      var files = grunt.file.expandFiles(config.prepend || []);
      var src = grunt.helper('concat', files, {
        separator: ''
      });
      b.prepend(src);

      files = grunt.file.expandFiles(config.append || []);
      src = grunt.helper('concat', files, {
        separator: ''
      });
      b.append(src);

      var bundle = b.bundle();
      if (!b.ok) {
        grunt.fail.fatal('Browserify bundle() failed.');
      }

      grunt.file.write(config.target || this.target, bundle);

    } catch (e) {
      grunt.fail.fatal('Browserify failed: ' + e);
    }

  });

};
