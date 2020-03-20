
//
// styles
// --------------------------------------------------

const gulp = require('gulp')
const plugins = require('gulp-load-plugins')({ camelize: true })
const config = require('../../gulpconfig').styles
const browserSync = require('browser-sync')
const runSequence = require('run-sequence')

// build main stylesheet from source scss files
gulp.task('styles-main', function() {
  return gulp.src(config.main.src)
    .pipe(plugins.sass(config.libsass).on('error', plugins.sass.logError))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concat(config.main.filename))
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest(config.build))
    .pipe(browserSync.stream())
})

gulp.task('styles-fonts', function() {
  return gulp.src(config.fonts.src)
    .pipe(plugins.sass(config.libsass).on('error', plugins.sass.logError))
    .pipe(gulp.dest(config.build))
})

gulp.task('styles-aboveTheFold', function() {
  return gulp.src(config.aboveTheFold.src)
    .pipe(plugins.sass(config.libsass).on('error', plugins.sass.logError))
    .pipe(gulp.dest(config.build))
})

gulp.task('styles-noJavascript', function() {
  return gulp.src(config.noJavascript.src)
    .pipe(plugins.sass(config.libsass).on('error', plugins.sass.logError))
    .pipe(gulp.dest(config.build))
})

// styles task
gulp.task('styles', function() { runSequence('styles-aboveTheFold', 'styles-noJavascript', 'styles-main', 'styles-fonts')})
