module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    devConf: 'pelicanconf.py',
    prodConf: 'publishconf.py',
    contentDir: 'content',
    outputDir: 'output',

    watch: {
      site: {
        files: ['<%= outputDir %>/*'],
        options: {
          livereload: true
        }
      }
    },

    connect: {
      server: {
        options: {
          livereload: true,
          keepalive: true,
          base: '<%= outputDir %>'
        }
      }
    },

    shell: {
      pelican: {
        command: function(env) {
          var conf = (env === 'dev') ? '<%= devConf %>' : '<%= prodConf %>';
          return 'pelican -r <%= contentDir %> -o <%= outputDir %> -s ' + conf;
        }
      },
      ghpimport: {
        command: function() {
          var isoDate = new Date().toISOString();
          return 'ghp-import -m "update ' + isoDate + '"';
        }
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true,
        limit: 4
      },
      devServe: {
        tasks: ['shell:pelican:dev', 'watch:site', 'connect:server']
      },
      prodServe: {
        tasks: ['shell:pelican:prod', 'watch:site', 'connect:server']
      },
    },

    clean: ['**/*.pyc', '__pycache__', '<%= outputDir %>', 'cache']

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['concurrent:devServe']);
  grunt.registerTask('pelican-dev', ['shell:pelican:dev']);
  grunt.registerTask('pelican-prod', ['shell:pelican:dev']);
  grunt.registerTask('ghp-import', ['shell:ghpimport']);

};
