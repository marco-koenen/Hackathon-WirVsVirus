//
// scripts
// --------------------------------------------------

const gulp = require('gulp')
const plugins = require('gulp-load-plugins')({camelize: true})
const webpack = require('webpack-stream')
const browserSync = require('browser-sync')
const runSequence = require('run-sequence')
const config = require('../../gulpconfig').scripts

// custom modernizr build
gulp.task('scripts-modernizr', function() {
  return gulp.src(config.modernizr.src).pipe(plugins.modernizr(config.modernizr.settings))
})

// concat main files
gulp.task('scripts-main', function() {
  return gulp
    .src(config.main.entry)
    .pipe(webpack(config.main.webpack))
    .pipe(gulp.dest(config.main.build))
    .pipe(browserSync.stream())
})

// copy lib files
gulp.task('scripts-lib', function() {
  return gulp
    .src(config.main.lib.src)
    .pipe(gulp.dest(config.main.lib.build))
    .pipe(browserSync.stream())
})

// scripts task
gulp.task('scripts', function() {
  runSequence('scripts-modernizr', 'scripts-main', 'scripts-lib')
})
