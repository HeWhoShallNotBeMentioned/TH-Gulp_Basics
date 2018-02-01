'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('concatScripts', function () {
  gulp.src([
    "js/jquery.js",
    "js/sticky/jquery.sticky.js",
    "js/main.js"])
  .pipe(concat("app.js"))
  .pipe(gulp.dest("js"));
});

gulp.task('minifyScripts', function (){
  gulp.src("js/app.js")
  .pipe(uglify())
  .pipe(rename('app.min.js'))
  .pipe(gulp.dest('js'));
});

gulp.task('default', ['hello'], function () {
  console.log("The default task!");
});
