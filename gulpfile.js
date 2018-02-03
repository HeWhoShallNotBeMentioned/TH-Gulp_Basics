'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');

gulp.task('concatScripts', function () {
  return gulp.src([
    "js/jquery.js",
    "js/sticky/jquery.sticky.js",
    "js/main.js"])
  .pipe(maps.init())
  .pipe(concat("app.js"))
  .pipe(maps.write('./'))
  .pipe(gulp.dest("js"));
});

gulp.task('minifyScripts',['concatScripts'] , function (){
  return gulp.src("js/app.js")
  .pipe(uglify())
  .pipe(rename('app.min.js'))
  .pipe(gulp.dest('js'));
});

gulp.task("compileSass", function(){
  return gulp.src("scss/application.scss")
  .pipe(maps.init())
  .pipe(sass())
  .pipe(maps.write('./'))
  .pipe(gulp.dest('css'));
});

gulp.task('watchSass', function(){
  gulp.watch(['scss/**/*.scss'], ['compileSass']);
});

gulp.task('build', ['minifyScripts', 'compileSass']);

gulp.task('default', ['build']);
