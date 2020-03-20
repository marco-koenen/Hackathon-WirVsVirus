
//
// browserSync
// --------------------------------------------------

const gulp  = require('gulp')
const browserSync = require('browser-sync')
const config = require('../../gulpconfig').browsersync

gulp.task('browser-sync', function() {
  browserSync(config)
})
