
//
// notifications
// --------------------------------------------------

const gulp = require('gulp')
const fs = require('fs')
const scripts = require('../../gulpconfig').scripts
const styles = require('../../gulpconfig').styles
const config = require('../../gulpconfig').build
let deployTask = false
let buildTask = false

// get file size
function getFilesizeInBytes(filename) {
  const stats = fs.statSync(filename)
  const fileSizeInBytes = bytesToSize(stats.size)
  return fileSizeInBytes
}

// convert bytes
function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Bytes'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
  if (i === 0) return `${bytes} ${sizes[i]}`
  return `${(bytes / (1024 * i)).toFixed(1)} ${sizes[i]}`
}

// set the flags
gulp.task('flag-deploy', function() { deployTask = true; })
gulp.task('flag-build', function() { buildTask = true; })

// finished task
gulp.task('finished', function() {
  process.on('exit', (code) => {
    const size_js = getFilesizeInBytes(scripts.main.build+scripts.main.filename)
    const size_css = getFilesizeInBytes(styles.build + styles.main.filename)

      process.stdout.write("\n*************************************************\n\n")

      if (buildTask) {
        process.stdout.write("\tFinished task: 'gulp build'\n")
        process.stdout.write("\tAll files have been built.\n")
      } else if (deployTask) {
        process.stdout.write("\tFinished task: 'gulp deploy'\n")
        process.stdout.write("\tAll files have been deployed.\n")
      }

      process.stdout.write("\n")
      process.stdout.write("\tJavascript:\t" + size_js + "\n")
      process.stdout.write("\tStylesheet:\t" + size_css + "\n")
      process.stdout.write("\n*************************************************\n\n")
      process.exit()
  });
});

// check if build folder is empty
fs.stat(config, function(err, stat) {
  if (err !== null && buildTask !== true && deployTask !== true) {
    process.stdout.write("\n*************************************************\n\n")
    process.stdout.write("\tNo files inside the build directory.\n")
    process.stdout.write("\tYou have to run: 'gulp build'.\n\n")
    process.stdout.write("*************************************************\n\n")
    process.exit()
  }
})
