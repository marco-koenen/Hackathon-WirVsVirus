
//
// fonts
// --------------------------------------------------

const gulp = require('gulp')
const config = require('../../gulpconfig').fonts
const browserSync = require('browser-sync')

// copy fonts from src in build folder
gulp.task('fonts', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.build))
    .pipe(browserSync.stream())
})
