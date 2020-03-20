
//
// layout files
// --------------------------------------------------

const gulp = require('gulp')
const plugins = require('gulp-load-plugins')({ camelize: true })
const config = require('../../gulpconfig').layout
const nojekyll = require('../../gulpconfig').nojekyll
const cname = require('../../gulpconfig').cname
const browserSync = require('browser-sync')
const gulpif = require('gulp-if')

// compile layout files
gulp.task('layouts', function() {
  gulp.src(config.src)
    .pipe(gulpif(config.layout_files === 'pug', plugins.pugInheritance({ basedir: config.build })).pipe(plugins.pug({ pretty: true })))
    .pipe(gulpif(config.layout_files !== 'pug', gulp.dest(config.build)))
    .pipe(browserSync.stream())
})

// copy nojekyll files
gulp.task('nojekyll', function () {
  gulp.src(nojekyll.src)
    .pipe(gulp.dest(nojekyll.build))
    .pipe(browserSync.stream())
})

// copy cname file
gulp.task('cname', function () {
  gulp.src(cname.src)
    .pipe(gulp.dest(cname.build))
    .pipe(browserSync.stream())
})