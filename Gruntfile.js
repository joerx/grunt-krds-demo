module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // maybe the simplest way to define custom tasks: exec something on bash
    exec: {
      tests: {
        cmd: 'NODE_ENV=test ./node_modules/.bin/mocha test/*.js'
      }
    },

    // this is a custom multi-task, see below. our own custom browserify 
    bundle: {
      app: {
        entries: ['./public/main.js'],
        bundle: './public/dist/bundle.js',
        debug: true
      }
    },

    // multi-task import via NPM module. minifies javascript.
    uglify: {
      app: {
        files: {
          './public/dist/bundle.min.js': ['./public/dist/bundle.js']
        }
      }
    },

    // very useful task for development: watch a set of files and execute a task when they change
    watch: {
      public: {
        files: ['./public/**/*.js', '!./public/dist/**/*.js'],
        tasks: ['bundle', 'uglify'],
        options: {atBegin: true}
      },
    }
  });

  // load tasks installed via NPM module (aka 'grunt plugins')
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // aliases for other tasks defined here and groups of tasks
  grunt.registerTask('test', ['exec:tests']);
  grunt.registerTask('build', ['test', 'bundle', 'uglify']);

  // 'default' task will be executed if grunt is invoked w/o arguments
  grunt.registerTask('default', 'build');


  // normally this task should be in an extra file and loaded via grunt.loadTasks. For simplicity,
  // we just include it here.
  grunt.registerMultiTask('bundle', function() {
    
    // here for brevity, normally put them on top of the file
    var fs = require('fs');
    var path = require('path');
    var browserify = require('browserify');
    var done = this.async();
    var data = this.data; // this changes for every target

    // create target dir
    grunt.file.mkdir(path.dirname(data.bundle));

    // bundle it and pipe it to the target
    var bundle = browserify({entries: data.entries, debug: !!data.debug}).bundle();
    var out = fs.createWriteStream(data.bundle);
    out.on('close', done);
    out.on('error', function(e) {grunt.fail.warn(e)});

    // smoke it!
    bundle.pipe(out);
  });

}
