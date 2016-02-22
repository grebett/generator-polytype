var generators = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');

// for infos, see: http://yeoman.io/authoring/
module.exports = generators.Base.extend({
	name: 'polytype',
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
		}
	},

	prompting: {
	},

	writing: {
		seed: function() {
			var done = this.async();
			this.remote('grebett', 'polymer-starter-kit', function (err, remote) {
				if (err) {
					console.log(err);
				}
				this.fs.copy(path.join(remote.cachePath, ''), '.');
				this.fs.copy(path.join(remote.cachePath, '.*'), '.'); // dot files
				done();
			}.bind(this));
		}
	},

	install: {
		deps: function() {
			this.installDependencies({
				bower: true,
				npm: true,
				skipMessage: false,
				callback: function() {
				console.log('All dependencies installed!')
				}
			});
		}
	},

	end: {
		thanks: function () {
			console.log(chalk.magenta('============================================='));
			console.log('Thank you for using the ' + this.name + ' generator. Happy coding!');
		}
	}
});
