var generators = require('yeoman-generator');
var chalk = require('chalk');

// for infos, see: http://yeoman.io/authoring/
// flags: --npminit > calls npm-init-generator, to scaffold a package.json file
module.exports = generators.Base.extend({
	name: 'polytype',
	answers: {},

	initializing: {
		npmInit: function() {
			if (this.options['npminit']) {
				this.composeWith('npm-init', {}, {
					local: require.resolve('generator-npm-init')
				});
			}
		}
	},

	prompting: {
		questions: function() {
			var done = this.async();
			this.prompt([{
				type: 'confirm',
				name: 'yn',
				default: false,
				message: 'yes or no?'
			}, {
				type: 'checkbox',
				name: 'patate',
				message: 'patate?',
				choices: ['douce', '{pas douce}']
			}], function (answers) {
				this.answers = answers;
				done();
			}.bind(this));
		}
	},

	writing: {
		responses: function() {
			console.log(this.answers);
		}
	// 	seed: function() {
	// 		var done = this.async();
	// 		this.remote('grebett', 'polymer-starter-kit', function (err, remote) {
	// 			if (err) {
	// 				console.log(err);
	// 			}
	// 			this.fs.copy(remote.cachePath, 'dest');
	// 			done();
	// 		}.bind(this));
	// 	}
	},

// 	end: {
// 		thanks: function () {
// 			console.log(chalk.magenta(
// '╔══╦╦╦═╦═╦╦╗ ╔╦╦═╦╦╗\n\
// ╚╗╔╣╩║╬║║║═╣ ║║║║║║║\n\
//  ║║║╦║║║║║║║ ╠╗║║║║║\n\
//  ╚╝╚╩╩╩╩╩╩╩╝ ╚═╩═╩═╝'));
// 			console.log('Thank you for using the ' + this.name + ' generator. Happy coding!');
// 		}
// 	}
});
