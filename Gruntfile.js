module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          ui: 'tdd',
          timeout: 5000
        },
        src: ['test/*.js']
      }
    },
    watch: {
      src: {
        files: ['quiver-auth.js', 'test/*', 'config/*'],
        tasks: ['mochaTest']
      }
    }
  });

  grunt.registerTask('default', ['mochaTest']);
}