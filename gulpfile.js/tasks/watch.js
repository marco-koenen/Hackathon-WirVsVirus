
//
// watch
// --------------------------------------------------

const gulp = require('gulp')
const config = require('../../gulpconfig').watch

gulp.task('watch', ['browser-sync'], function () {
  gulp.watch(config.src.scripts, ['scripts'])
  gulp.watch(config.src.styles, ['styles'])
  gulp.watch(config.src.layouts, ['layouts'])
  gulp.watch(config.src.markdown, ['markdown'])
  gulp.watch(config.src.images, ['images'])
  gulp.watch(config.src.fonts, ['fonts'])
})
