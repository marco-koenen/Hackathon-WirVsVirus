
//
// main
// --------------------------------------------------

const gulp = require('gulp')
const runSequence = require('run-sequence')

// default task
gulp.task('default', ['watch'])

// deploy all source files and upload them to github
gulp.task('deploy', ['flag-deploy'], function() { runSequence('clean', ['deploy-scripts', 'deploy-styles'], ['deploy-images'], ['fonts'], ['deploy-layouts', 'nojekyll', 'cname'])})

// Build a working copy of the theme
gulp.task('build', ['flag-build'], function() {  runSequence('clean', ['scripts', 'styles'], ['images', 'fonts'], ['layouts'], ['nojekyll', 'cname', 'finished'])})

// Clean all project directories
gulp.task('clean', ['clean-build', 'clean-dsstore'])