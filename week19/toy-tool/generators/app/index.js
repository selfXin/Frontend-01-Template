
var Generator = require('yeoman-generator');

module.exports = class extends Generator {};


module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }

  collecting(){

  }

  creating(){
    // this.npmInit();
    this.yarnInstall([
        
        "@babel/core",
        "@babel/preset-env",
        "@babel/register",
        "@istanbuljs/nyc-config-babel",
        "@babel/plugin-transform-react-jsx",
        "ava",
        "babel-loader",
        "babel-plugin-istanbul",
        "mocha",
        "nyc",
        "webpack",
        "webpack-dev-server",
        "html-webpack-plugin",
     ],{'save-dev': true})
    // this.npmInstall([
   
    //     "jquery"
    //  ],{'save-dev': true})
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      { title: 'tool' }
    );

    this.fs.copyTpl(
      this.templatePath('reactCreateElement.js'),
      this.destinationPath('lib/reactCreateElement.js')
    );
    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath('src/main.js')
    );

    this.fs.copyTpl(
      this.templatePath('gesture.js'),
      this.destinationPath('src/gesture.js')
    );
    this.fs.copyTpl(
      this.templatePath('animation.js'),
      this.destinationPath('src/animation.js')
    );
    this.fs.copyTpl(
      this.templatePath('Carousel.js'),
      this.destinationPath('src/Carousel.js')
    );



     this.fs.copyTpl(
      this.templatePath('.nycrc'),
      this.destinationPath('.nycrc')
    );
     this.fs.copyTpl(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc')
    );

    this.fs.copyTpl(
      this.templatePath('main.test.js'),
      this.destinationPath('test/main.test.js')
    );

     this.fs.copyTpl(
      this.templatePath('main.test.js'),
      this.destinationPath('test/main.test.js')
    );

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('index.html'),
      { title: 'tool' }
    );
  }


};