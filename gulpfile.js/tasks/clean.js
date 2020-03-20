
//
// clean all folders
// --------------------------------------------------

const gulp = require('gulp')
const plugins = require('gulp-load-plugins')({ camelize: true })
const config = require('../../gulpconfig').clean

gulp.task('clean-build', function() {
  return gulp.src(config.build)
    .pipe(plugins.clean(config.options))
})

gulp.task('clean-dsstore', function() {
  return gulp.src(config.dsstore)
    .pipe(plugins.clean(config.options))
})
