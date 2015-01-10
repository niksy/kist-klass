module.exports = function ( grunt ) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		meta: {
			banner: '/*! <%= pkg.name %> <%= pkg.version %> - <%= pkg.description %> | Author: <%= pkg.author %>, <%= grunt.template.today("yyyy") %> | License: <%= pkg.license %> */\n'
		},

		concat: {
			dist: {
				options: {
					stripBanners: true,
					banner: '<%= meta.banner %>'
				},
				files: {
					'dist/<%= pkg.name %>.js': ['compiled/<%= pkg.main %>']
				}
			}
		},

		uglify: {
			dist: {
				options: {
					banner: '<%= meta.banner %>'
				},
				files: {
					'dist/<%= pkg.name %>.min.js': ['compiled/<%= pkg.main %>']
				}
			}
		},

		bump: {
			options: {
				files: ['package.json', 'bower.json'],
				updateConfigs: ['pkg'],
				commit: true,
				commitMessage: 'Release %VERSION%',
				commitFiles: ['-a'],
				createTag: true,
				tagName: '%VERSION%',
				tagMessage: '',
				push: false
			}
		},

		jscs: {
			main: {
				options: {
					config: '.jscsrc'
				},
				files: {
					src: [
						'<%= pkg.main %>',
						'lib/**/*.js'
					]
				}
			}
		},

		jshint: {
			main: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: [
					'<%= pkg.main %>',
					'lib/**/*.js'
				]
			}
		},

		browserify: {
			options: {
				browserifyOptions: {
					standalone: 'kist.klass'
				}
			},
			standalone: {
				options: {
					plugin: ['bundle-collapser/plugin']
				},
				files: {
					'compiled/<%= pkg.main %>': ['<%= pkg.main %>']
				}
			},
			test: {
				files: {
					'compiled/test/index.js': ['test/index.js']
				}
			}
		},

		mochaTest: {
			options: {
				reporter: 'spec'
			},
			main: {
				src: ['test/index.js']
			}
		},

		karma: {
			main: {
				configFile: 'karma.conf.js'
			}
		}

	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('test', ['mochaTest','karma']);
	grunt.registerTask('stylecheck', ['jshint', 'jscs']);
	grunt.registerTask('default', ['stylecheck', 'browserify:standalone', 'concat', 'uglify']);
	grunt.registerTask('releasePatch', ['bump-only:patch', 'default', 'bump-commit']);
	grunt.registerTask('releaseMinor', ['bump-only:minor', 'default', 'bump-commit']);
	grunt.registerTask('releaseMajor', ['bump-only:major', 'default', 'bump-commit']);

};
