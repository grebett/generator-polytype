var generators = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');
var targz = require('tar.gz');
var fs = require('fs');
var mv = require('mv');
var del = require('del');
var randomstring = require('randomstring');
var Download = require('download');

// for infos, see: http://yeoman.io/authoring/
module.exports = generators.Base.extend({
	name: 'polytype',
	dir: '.',
	answers: {},

	initializing: {
		hello: function () {
			console.log(chalk.yellow(
				' _____      _       _\n' +
				'|  __ \\    | |     | |\n' +
				'| |__) |__ | |_   _| |_ _   _ _ __   ___\n' +
				'|  ___/ _ \\| | | | | __| | | | \'_ \\ / _ \\\n' +
				'| |  | (_) | | |_| | |_| |_| | |_) |  __/\n' +
				'|_|   \\___/|_|\\__, |\\__|\\__, | .__/ \\___|\n' +
				'               __/ |     __/ | |\n' +
				'              |___/     |___/|_|         \n' +
				'============================================='));
		},
	},

	prompting: {
	},

	writing: {
		seed: function() {
			var done = this.async();
			var download = new Download({mode:'755', extract: false});
			
			console.log(chalk.blue('┃'), 'downloading polymer-starter-kit tarball');
			download
				.get('https://github.com/grebett/polymer-starter-kit/archive/master.tar.gz')
				.dest('tmp')
				.run(function () {
					console.log(chalk.green('┗'), 'polymer-starter-kit tarball downloaded');
					console.log(chalk.blue('┃'), 'extracting polymer-starter-kit tarball');
					targz()
						.extract('tmp/master.tar.gz', '.')
						.then(function(){
							console.log(chalk.green('┗'), 'tarball extracted!');
							mv('polymer-starter-kit-master', 'polymer-starter-kit', function (error) {
								this.dir = 'polymer-starter-kit';
								if (error) {
									if (error.code === 'EEXIST' || error.code === 'ENOTEMPTY') {
										var newName = randomstring.generate(5) + new Date().getTime();
										mv('polymer-starter-kit-master', newName, function (error) {
											console.log(chalk.yellow('▲'), 'polymer-starter-kit directory already exists -> fall back to ' + newName);
											this.dir = newName;
											done();
										}.bind(this));
									}
								}
								done();
							}.bind(this));
						}.bind(this))
						.catch(function(err){
							console.log(chalk.red('Error: ', err.stack));
						});
				}.bind(this));
				
		}
	},

	install: {
		deps: function() {
			process.chdir(this.dir);
			console.log(chalk.blue('┃'), 'installing dependencies');
			this.installDependencies({
				bower: true,
				npm: true,
				skipMessage: false,
				callback: function() {
					console.log(chalk.green('┗'), 'all dependencies installed!')
				}
			});
		}
	},

	end: {
		cleaning: function () {
      process.chdir('..');
			var done = this.async();
			console.log(chalk.blue('┃'), 'cleaning the temp directory');
			del(['tmp']).then(function (paths) {
				console.log(chalk.green('┗'), 'temp directory cleaned!');
				done();
			});
		},

		thanks: function () {
			console.log(chalk.magenta('============================================='));
			console.log('Thank you for using the ' + this.name + ' generator. Happy coding!');
		}
	}
});
