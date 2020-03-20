
//
// publish
// --------------------------------------------------

const gulp = require('gulp')
const plugins = require('gulp-load-plugins')({ camelize: true })

gulp.task('publish:patch', function() {
  gulp.src('./package.json')
    .pipe(plugins.bump({ type: 'patch' }))
    .pipe(gulp.dest('./'))
})

gulp.task('publish:minor', function () {
  gulp.src('./package.json')
    .pipe(plugins.bump({ type: 'minor' }))
    .pipe(gulp.dest('./'))
})

gulp.task('publish:major', function () {
  gulp.src('./package.json')
    .pipe(plugins.bump({ type: 'major' }))
    .pipe(gulp.dest('./'))
})

