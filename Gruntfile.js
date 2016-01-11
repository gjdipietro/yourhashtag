module.exports = function(grunt) {

  // 1. All configuration goes here 
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
		  livereload: {
	      options: { 
	      	livereload: true 
	      },
	      files: ['build/**/*'],
			},
		},

    autoprefixer: {
      options: {
				browsers: ['last 2 versions', 'ie 8', 'ie 9', '> 1%']
      },
      main: {
        expand: true,
        flatten: true,
        src: 'public/assets/css/*.css',
        dest: 'build/'
      }
    },

    clean: ["build/"],

  });

  // 3. Where we tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default', ['watch']); //everyday work
  grunt.registerTask('build', ['clean', 'autoprefixer']); // push to live

};
