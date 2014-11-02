module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    devConf: 'pelicanconf.py',
    prodConf: 'publishconf.py',
    hamlContentDir: 'content/haml',
    contentDir: 'content/html',
    outputDir: 'output',
    themeDir: 'timmart.in_theme',

    watch: {
      output: {
        files: ['<%= outputDir %>/**/*'],
        options: {
          livereload: true
        }
      },
      pelicanDev: {
        files: ['<%= contentDir %>/**/*', '<%= themeDir %>/**/*', '<%= devConf %>'],
        tasks: 'shell:pelican:dev'
      },
      pelicanProd: {
        files: ['<%= contentDir %>/**/*', '<%= themeDir %>/**/*', '<%= prodConf %>'],
        tasks: 'shell:pelican:prod'
      },
      haml: {
        files: ['<%= hamlContentDir %>/*.haml'],
        tasks: 'haml:articles'
      }
    },

    haml: {
      description: "Run articles thru haml",
      articles: {
        files: [ {
          expand: true,
          cwd: '<%= hamlContentDir %>',
          src: ['*.haml'],
          dest: '<%= contentDir %>',
          ext: '.html'
        } ]
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
          return 'pelican <%= contentDir %> -o <%= outputDir %> -s ' + conf;
        }
      },
      ghpimport: {
        command: function() {
          var isoDate = new Date().toISOString();
          return 'ghp-import -p -m "update ' + isoDate + '" <%= outputDir %>';
        }
      },
    },

    concurrent: {
      options: {
        logConcurrentOutput: true,
        limit: 4
      },
      serveDev: {
        tasks: ['watch:pelicanDev', 'watch:output', 'watch:haml', 'connect:server']
      },
      serveProd: {
        tasks: ['watch:pelicanProd', 'watch:output', 'watch:haml', 'connect:server']
      },
    },

    clean: ['__pycache__', '<%= outputDir %>', 'cache']

  });

  // plugin tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-haml2html');

  // my tasks
  grunt.registerTask('dev-serve', 'Start a server that watches for content changes and runs pelican with development settings', ['shell:pelican:dev', 'concurrent:serveDev']);
  grunt.registerTask('prod-serve', 'Like dev-serve, but run with production settings', ['shell:pelican:prod', 'concurrent:serveProd']);

  grunt.registerTask('pelican-dev', 'Run pelican with development settings', ['shell:pelican:dev']);
  grunt.registerTask('pelican-prod', 'Run pelican with production settings', ['shell:pelican:prod']);

  grunt.registerTask('publish', 'Push a production pelican build to github for WWW serving', ['shell:pelican:prod', 'shell:ghpimport']);

  grunt.registerTask('default', 'Alias for dev-serve', ['dev-serve']);
};
