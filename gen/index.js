/// <reference path="../typings/yeoman-generator/yeoman-generator.d.ts"/>
/// <reference path='../typings/underscore.string/underscore.string.d.ts' />
/// <reference path='../typings/cheerio/cheerio.d.ts' />
/// <reference path='../typings/mkdirp/mkdirp.d.ts' />
var hyd = require('hydrolysis');
var mkdirp = require("mkdirp");
var path = require("path");
var _s = require('underscore.string');
var yeoman = require("yeoman-generator");
var GeneratorPolymerTS;
(function (GeneratorPolymerTS) {
    // YEOMAN GENERATOR GENERATOR
    var Gen /* extends yeoman.IYeomanGenerator */ = (function () {
        function Gen /* extends yeoman.IYeomanGenerator */() {
            yeoman.Base.apply(this, arguments);
            //console.log( "Gen.constructor");
            this.yo = this; // this reference as yo.YeomanGeneratorBase
            this.yo.argument("elementName", { required: true, type: 'string', desc: "element name. Must contains dash symbol!" });
            this.yo.option("elpath", { desc: "element source path" });
            this.yo.option("path", { desc: "element output path", defaults: "typings/polymer" });
            this.yo.option("refpath", { desc: "generate reference path", defaults: false });
        }
        Gen /* extends yeoman.IYeomanGenerator */.prototype._parseElement = function (analyzer) {
            var _this = this;
            mkdirp.sync(this.options.path);
            if (analyzer.behaviors) {
                var set = {};
                analyzer.behaviors.forEach(function (v, index, array) {
                    if (!set[v.is]) {
                        set[v.is] = v;
                        _this._parseBehavior(v);
                    }
                });
            }
            var el = analyzer.elementsByTagName[this.elementName];
            if (el) {
                if (el.behaviors && el.behaviors.length == 0) {
                    el.behaviors = null;
                }
                var publicProps = el.properties.filter(function (value, index, array) {
                    return !((value.function) || (value.private));
                });
                var publicMethods = el.properties.filter(function (value, index, array) {
                    return ((value.function) && !(value.private));
                });
                var module = el.is.split('-')[0];
                var target = path.join(this.options.path, el.is.concat(".d.ts"));
                try {
                    this.yo.template(path.join(__dirname, 'templates/_element.tst'), target, { element: el,
                        moduleName: module,
                        className: _s.classify(el.is),
                        props: publicProps,
                        methods: publicMethods,
                        templateParams: this._templateParams,
                        templateType: this._templateType,
                        templateDesc: this._templateDesc,
                        templateReferencePath: (this.options.refpath) ?
                            this._templateReferencePath :
                            this._templateReferenceSimplePath
                    });
                    this._unescapeFile(target);
                }
                catch (e) {
                    this.yo.log("error: " + e);
                }
            }
        };
        Gen /* extends yeoman.IYeomanGenerator */.prototype._parseBehavior = function (el) {
            var tk = el.is.split('.');
            var module = (tk.length == 1) ? "Polymer" : tk[0];
            var name = (tk.length == 1) ? tk[0] : tk[1];
            var target = path.join(this.options.path, name.concat(".d.ts"));
            var publicProps = el.properties.filter(function (value, index, array) {
                return !((value.function) || (value.private));
            });
            var publicMethods = el.properties.filter(function (value, index, array) {
                return ((value.function) && !(value.private));
            });
            try {
                this.yo.template(path.join(__dirname, 'templates/_behaviour.tst'), target, { element: el,
                    moduleName: module,
                    className: _s.classify(name),
                    props: publicProps,
                    methods: publicMethods,
                    templateParams: this._templateParams,
                    templateType: this._templateType,
                    templateDesc: this._templateDesc,
                    templateReferencePath: (this.options.refpath) ?
                        this._templateReferencePath :
                        this._templateReferenceSimplePath
                });
                this._unescapeFile(target);
            }
            catch (e) {
                console.log("error: ", e);
            }
        };
        Gen /* extends yeoman.IYeomanGenerator */.__templateType = function (p) {
            if (!p.type)
                return '';
            var match = p.type.match(/^[!\?]?(.*[^=])(=)?$/), type = match[1], optional = !!match[2], result;
            switch (type.toLowerCase()) {
                case '*':
                    result = ': any';
                    break;
                case 'array':
                    result = ': Array<any>';
                    break;
                case 'object':
                    result = ': Object';
                    break;
                case 'string':
                    result = ': string';
                    break;
                default:
                    result = (': ' + type).replace(/^: \?/, ': ');
            }
            if (optional) {
                result = '?' + result;
            }
            return result;
        };
        Gen /* extends yeoman.IYeomanGenerator */.prototype._templateType = function (p) {
            return Gen.__templateType(p);
        };
        Gen /* extends yeoman.IYeomanGenerator */.prototype._templateParams = function (params) {
            if (!params)
                return "";
            return params.map(function (value, index, array) {
                return value.type ? (value.name + Gen.__templateType(value)) : value.name;
            }).join(', ');
        };
        Gen /* extends yeoman.IYeomanGenerator */.prototype._templateDesc = function (p, tabs) {
            if (tabs === void 0) { tabs = '\t'; }
            var desc = p.desc || '';
            var newline = new RegExp('\\n', 'g');
            var trailingSpace = new RegExp('[\\n\\s]+$', 'g');
            var comment = new RegExp('\\*/', 'g');
            return desc.replace(trailingSpace, '')
                .replace(newline, '\n\t' + tabs)
                .replace(comment, '');
        };
        Gen /* extends yeoman.IYeomanGenerator */.prototype._unescapeFile = function (path) {
            var content = this.fs.read(path);
            this.fs.write(path, _s.unescapeHTML(content.toString()));
        };
        Gen /* extends yeoman.IYeomanGenerator */._referencePathPrefix = function (elementName) {
            return elementName.replace(/^([A-Z][a-z]+).*/, '$1').toLowerCase();
        };
        Gen /* extends yeoman.IYeomanGenerator */.prototype._templateReferencePath = function (behavior) {
            behavior = behavior.match(/^(?:Polymer\.)?(.*)/)[1];
            if (!behavior.match('^' + this['moduleName'])) {
                behavior = path.join('..', Gen._referencePathPrefix(behavior), behavior).toString();
            }
            return "/// <reference path=\"" + behavior + ".d.ts\"/>";
        };
        Gen /* extends yeoman.IYeomanGenerator */.prototype._templateReferenceSimplePath = function (behavior) {
            behavior = behavior.match(/^(?:Polymer\.)?(.*)/)[1];
            return "/// <reference path=\"" + behavior + ".d.ts\"/>";
        };
        // YO METHOD
        Gen /* extends yeoman.IYeomanGenerator */.prototype.initializing = function () {
            //console.log( "Gen.initializing");
            if (this.elementName.indexOf('-') === -1) {
                this.yo.emit('error', new Error('Element name must contain a dash "-"\n' +
                    'ex: yo polymer:el my-element'));
            }
        };
        // YO METHOD
        Gen /* extends yeoman.IYeomanGenerator */.prototype.configuring = function () {
            //console.log( "Gen.configuring");
        };
        // YO METHOD
        Gen /* extends yeoman.IYeomanGenerator */.prototype.prompting = function () {
            //console.log( "Gen.prompting");
        };
        // GOAL METHOD
        Gen /* extends yeoman.IYeomanGenerator */.prototype.execute = function () {
            var _this = this;
            //console.log( "Gen.execute" );
            var pathBower = path.join(process.cwd(), 'bower_components');
            var el = (this.options.elpath) ?
                path.join(this.options.elpath, this.elementName) :
                path.join(this.elementName, this.elementName);
            var pathToEl = path.join(pathBower, el);
            var elementHtml = pathToEl.concat('.html');
            console.log("generating typescript for element", this.elementName, elementHtml);
            hyd.Analyzer.analyze(elementHtml)
                .then(function (analyzer) {
                _this._parseElement(analyzer);
            });
        };
        // YO METHOD
        Gen /* extends yeoman.IYeomanGenerator */.prototype.end = function () {
        };
        return Gen /* extends yeoman.IYeomanGenerator */;
    })();
    GeneratorPolymerTS.Gen /* extends yeoman.IYeomanGenerator */ = Gen /* extends yeoman.IYeomanGenerator */;
})(GeneratorPolymerTS || (GeneratorPolymerTS = {}));
var gen = yeoman.Base.extend(GeneratorPolymerTS.Gen.prototype);
module.exports = gen;
