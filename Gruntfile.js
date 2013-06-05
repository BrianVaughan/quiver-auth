module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    nodeunit: {
      tests: 'test.js'
    },
    watch: {
      src: {
        files: ['quiver-auth.js', 'test.js'],
        tasks: ['nodeunit']
      }
    }
  });

  grunt.registerTask('default', ['nodeunit']);
}