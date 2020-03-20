
//
// deploy files
// --------------------------------------------------

const gulp = require('gulp')
const plugins = require('gulp-load-plugins')({ camelize: true })
const runSequence = require('run-sequence')
const webpack = require('webpack-stream')
const deploy = require('../../gulpconfig').deploy
const styles = require('../../gulpconfig').styles
const scripts = require('../../gulpconfig').scripts
const layout = require('../../gulpconfig').layout
const images = require('../../gulpconfig').images
const gulpif = require('gulp-if')

// deploy css files (front-end)
gulp.task('deploy-css', function() {
  return gulp.src(styles.main.src)
    .pipe(plugins.sass(styles.libsass).on('error', plugins.sass.logError))
    .pipe(plugins.groupCssMediaQueries())
    .pipe(plugins.cssnano(deploy.css.cssnano))
    .pipe(plugins.concat(styles.main.filename))
    .pipe(plugins.banner(copyright))
    .pipe(gulp.dest(styles.build))
})

gulp.task('deploy-css-aboveTheFold', function() {
  return gulp.src(styles.aboveTheFold.src)
    .pipe(plugins.sass(styles.libsass).on('error', plugins.sass.logError))
    .pipe(plugins.groupCssMediaQueries())
    .pipe(plugins.cssnano(deploy.css.cssnano))
    .pipe(gulp.dest(styles.build))
})

gulp.task('deploy-css-noJavascript', function() {
  return gulp.src(styles.noJavascript.src)
    .pipe(plugins.sass(styles.libsass).on('error', plugins.sass.logError))
    .pipe(plugins.groupCssMediaQueries())
    .pipe(plugins.cssnano(deploy.css.cssnano))
    .pipe(gulp.dest(styles.build))
})

gulp.task('deploy-js', function() {
  return gulp.src(scripts.main.entry)
    .pipe(webpack(deploy.js.webpack))
    .pipe(plugins.optimizeJs(deploy.js.optimizejs.settings))
    .pipe(plugins.banner(copyright))
    .pipe(gulp.dest(deploy.js.uglify.build))
})

gulp.task('deploy-lib', function () {
  return gulp.src(scripts.main.lib.src)
    .pipe(plugins.optimizeJs(deploy.js.optimizejs.settings))
    .pipe(plugins.uglify(deploy.js.uglify.settings))
    .pipe(gulp.dest(scripts.main.lib.build))
})

gulp.task('deploy-layouts', function() {
  return gulp.src(layout.src)
    .pipe(gulpif(layout.layout_files === 'pug', plugins.pugInheritance({ basedir: layout.build })).pipe(plugins.pug({ pretty: true })))
    .pipe(gulpif(layout.layout_files !== 'pug', gulp.dest(layout.build)))
})

gulp.task('deploy-images-assets', function() {
  return gulp.src(images.assets.src)
    .pipe(plugins.imagemin(deploy.images.imagemin.optimizationLevel, deploy.images.imagemin.progressive, deploy.images.imagemin.interlaced))
    .pipe(gulp.dest(images.assets.build))
})

// deploy tasks
gulp.task('deploy-scripts', function() { runSequence('deploy-js', 'deploy-lib')})
gulp.task('deploy-styles', ['deploy-css', 'styles-fonts', 'deploy-css-aboveTheFold', 'deploy-css-noJavascript'])
gulp.task('deploy-images', function() { runSequence('deploy-images-assets')})
