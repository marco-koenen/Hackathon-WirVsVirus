
//
// deploy files
// --------------------------------------------------

const gulp = require('gulp')
const plugins = require('gulp-load-plugins')({ camelize: true })
const browserSync = require('browser-sync')
const runSequence = require('run-sequence')
const config = require('../../gulpconfig').images

// copy changed images from the source folder
gulp.task('images-assets', function() {
  return gulp.src(config.assets.src)
    .pipe(plugins.newer(config.assets.build))
    .pipe(gulp.dest(config.assets.build))
    .pipe(browserSync.stream())
})

// combine tasks
gulp.task('images', function () {
  runSequence('images-assets')
})