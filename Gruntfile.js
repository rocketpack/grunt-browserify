module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			files: ['grunt.js', 'tasks/**/*.js', 'test/**/*.js'],
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				node: true,
				es5: true
			},
			globals: {}
		}
	});

	// Load local tasks.
	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// Default task.
	grunt.registerTask('default', ['jshint']);

};
