![](http://yeoman.io/static/yeoman-02.dc21b7fc1d.png)
src: yeoman.io

## Generator for Polymer based on Polymer Starter Kit: using TypeScript and some micro-libraries for routing, DI, AJAX, etc...

This generator relies mainly on my own [fork](https://github.com/grebett/polymer-starter-kit) of polymer-starter-kit.
It scaffolds a simple application with [Polymer](https://www.polymer-project.org/1.0/) and [Typescript](http://www.typescriptlang.org/), plus some micro-libraries:

+ [page.js](https://visionmedia.github.io/page.js/) for routing
+ [oboe.js](https://github.com/jimhigson/oboe.js) for AJAX (and streaming queries)
+ [inversify](http://inversify.io/) for Dependency Injection

## Cave at

This generator is stable, but the sub-repository is still a work in progress and is very likely to change in the near future since I am still experimenting.
Issues and pull requests are so very welcome but remember this is an __opinionated repository__ and some of your preferences might not fit mine.
Please feel free to fork this generator and replace my fork of the Polymer Starter Kit with the one of your choice.

## How to use this generator

First, you will need to have the following dependencies installed globally with npm:

+ [TypeScript](https://github.com/Microsoft/TypeScript) `you don't say?`
+ [Yeoman](http://yeoman.io/) 
+ [Gulp](https://github.com/gulpjs/gulp)
+ [concurrently](https://github.com/kimmobrunfeldt/concurrently)
+ [lite-server](https://github.com/johnpapa/lite-server)

This generator may not be yet referenced by the yeoman website. To install it, clone this repository then, within it, use `npm link`. This will add the generator to your globally installed npm package on your computer only.

To run the generator, just enter:
```shell
$ yo polytype
```

## Author
grebett, 2016, with open source code from:

+ [@nippur72](https://github.com/nippur72) for Polymerts
+ [@PolymerElements](https://github.com/PolymerElements) for the Polymer Starter Kit
+ [@bsorrentino](https://github.com/bsorrentino) for the Polymerts generator
