
//
// we are using http://gulpjs.com/ as a build system.
// change the necessary variables in the 'settings.yml' file
// --------------------------------------------------

const yaml = require("js-yaml")
const fs = require("fs")
const historyFallback = require('connect-history-api-fallback')
const config = yaml.safeLoad(fs.readFileSync('settings.yml', 'utf8'))


//
// build settings
// --------------------------------------------------

const hostname = config.hostname
const src = config.build_src
const build = config.build_build
const data = config.build_data
const assets = config.build_assets
const js = config.build_js
const lib = config.build_lib
const scss = config.build_scss
const css = config.build_css
const images = config.build_images
const fonts = config.build_fonts
const browsers = config.build_browsers
const purifyWhitelist = config.build_purifyWhitelist
const filename_js = config.filename_js
const filename_css = config.filename_css
const layout_files = config.layout_files
const copyright = config.copyright

module.exports = {

  build: build, // here to check if build folder is empty

  //
  // scripts
  // --------------------------------------------------

  scripts: {
    modernizr: {
      src: [src+assets+js+'**/*.js', src+assets+scss+'**/*.scss'],
      settings: {
        'cache': true,
        'crawl':  false,
        'dest': src+assets+js+lib+'modernizr.js',
        'options' : [
          'setClasses'
        ]
      }
    },
    main: {
      filename: filename_js+'.js',
      build: build+assets+js,
      entry: src+assets+js+'main.js',
      lib: {
        src: src+assets+js+'lib/**/*.js',
        build: build+assets+js+lib,
      },
      webpack: {
        mode: 'development',
        watch: false,
        cache: true,
        output: {
          filename: filename_js+'.js',
          chunkFilename: '[name].js'
        },
        module: {
          rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: ['dynamic-import-webpack']
              }
            }
          }]
        }
      },
      browserify: {
        debug: true,
        entries: [src+assets+js+'main.js'],
        transform: ['babelify']
      }
    }
  },


  //
  // styles
  // --------------------------------------------------

  styles: {
    build: build+assets+css+'',
    compiler: 'libsass',
    main: {
      src: [src+assets+scss+'*.scss', '!'+src+assets+scss+'fonts.scss', '!'+src+assets+scss+'aboveTheFold.scss', '!'+src+assets+scss+'noJavascript.scss'],
      filename: filename_css+'.css'
    },
    fonts: {
      src: src+assets+scss+'fonts.scss',
      filename: 'fonts.css'
    },
    aboveTheFold: {
      src: src+assets+scss+'aboveTheFold.scss',
      filename: 'aboveTheFold.css'
    },
    noJavascript: {
      src: src+assets+scss+'noJavascript.scss',
      filename: 'noJavascript.css'
    }
  },


  //
  // nojekyll
  // --------------------------------------------------

  nojekyll: {
    src: src+'**/.nojekyll',
    build: build
  },


  //
  // CNAME
  // --------------------------------------------------

  cname: {
    src: src+'CNAME',
    build: build
  },


  //
  // layout files
  // --------------------------------------------------

  layout: {
    src: src+'*.'+layout_files,
    build: build,
    ext: layout_files
  },


  //
  // fonts
  // --------------------------------------------------

  fonts: {
    src: src+assets+fonts+'**/*',
    build: build+assets+fonts
  },


  //
  // images
  // --------------------------------------------------

  images: {
    assets: {
      src: src+assets+images+'**/*(*.png|*.jpg|*.jpeg|*.gif|*.svg)',
      build: build+assets+images
    }
  },


  //
  // browser sync
  // --------------------------------------------------

  browsersync: {
    files: [build+'/**/*', '!'+build+'/**.map'],
    logPrefix: hostname,
    logLevel: 'silent',
    notify: false,
    server: {
      baseDir: './'+build,
      middleware: [
        historyFallback()
      ]
    },
    https: false,
    watchOptions: {
      debounceDelay: 2000
    }
  },


  //
  // clean
  // --------------------------------------------------

  clean: {
    build: build,
    dsstore: '**/*.DS_Store',
    options: {
      read: false,
      force: false,
      allowEmpty: true
    }
  },


  //
  // deploy
  // --------------------------------------------------

  deploy: {
    css: {
      content: build+assets+css+'*.css',
      compiler: 'libsass',
      cssnano: {
        autoprefixer: {
          add: true,
          browsers: browsers
        },
        discardComments: {
          removeAll: true
        }
      },
      purify: {
        options: {
          minify: true,
          rejected: false,
          info: false,
          whitelist: purifyWhitelist
        },
        content: [
          build+assets+js+filename_js+'.js',
          src+'*.'+layout_files
        ]
      }
    },
    js: {
      webpack: {
        mode: 'production',
        watch: false,
        cache: false,
        output: {
          filename: filename_js+'.js',
          chunkFilename: '[name].js'
        },
        module: {
          rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: ['dynamic-import-webpack']
              }
            }
          }]
        }
      },
      optimizejs: {
        src: [build+assets+js+filename_js+'.js'],
        settings: {
          'sourceMap': false
        }
      },
      uglify: {
        src: [build+assets+js+filename_js+'.js'],
        build: build+assets+js+'',
        settings: {
          'preserveComments': true,
          'compress': true,
          'sourceMap': false
        }
      }
    },
    images: {
      imagemin: {
        optimizationLevel: 6,
        progressive: true,
        interlaced: true
      }
    }
  },


  //
  // deploy to github
  // --------------------------------------------------

  github: {
    src: [build+'**/*', build+'**/.nojekyll'],
    options: {
      'branch': 'gh-pages',
      'message': 'Deployed master branch',
      'cacheDir': false
    }
  },


  //
  // watch
  // --------------------------------------------------

  watch: {
    src: {
      scripts: [src+assets+js+'**/*.js'],
      styles: [src+assets+scss+'**/*.scss'],
      fonts: src+assets+fonts+'**/*',
      images: src+assets+images+'**/*(*.png|*.jpg|*.jpeg|*.gif|*.svg)',
      layouts: src+'**/*.'+layout_files
    }
  }
}
