
//
// deploy files
// --------------------------------------------------

const gulp = require('gulp')
const plugins = require('gulp-load-plugins')({ camelize: true })
const config = require('../../gulpconfig').github

gulp.task('deploy-github', function () {
  return gulp.src(config.src)
    .pipe(plugins.ghPages(config.options))
})
