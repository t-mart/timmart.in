module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    outputDir: '_site',
    shell: {
      ghpimport: {
        command: function() {
          var isoDate = new Date().toISOString();
          return 'ghp-import -p -m "update ' + isoDate + '" <%= outputDir %>';
        }
      },
    }
  });

  // plugin tasks
  grunt.loadNpmTasks('grunt-shell');

  // my tasks
  grunt.registerTask('publish', 'Push a production pelican build to github for WWW serving', ['shell:pelicanProd', 'shell:ghpimport']);
};
