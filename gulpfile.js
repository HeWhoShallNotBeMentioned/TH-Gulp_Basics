'use strict';

const gulp    = require('gulp');
const concat  = require('gulp-concat');
const uglify  = require('gulp-uglify');
const rename  = require('gulp-rename');
const sass    = require('gulp-sass');
const maps    = require('gulp-sourcemaps');
const del     = require('del');
const connect = require('gulp-connect');
var options = {
  src: 'src',
  dist: 'dist'
};


// gulp.task('concatScripts', function () {
//   return gulp.src([
//     "js/jquery.js",
//     "js/sticky/jquery.sticky.js",
//     "js/main.js"])
//   .pipe(maps.init())
//   .pipe(concat("app.js"))
//   .pipe(maps.write('./'))
//   .pipe(gulp.dest("js"));
// });

gulp.task('minifyScripts',['concatScripts'] , function (){
  return gulp.src("js/app.js")
  .pipe(uglify())
  .pipe(rename('app.min.js'))
  .pipe(gulp.dest('js'));
});

gulp.task("compileSass", function(){
  return gulp.src(options.src + "/scss/application.scss")
  .pipe(maps.init())
  .pipe(sass())
  .pipe(maps.write('./'))
  .pipe(gulp.dest(options.src + '/css'));
});

gulp.task('watchFiles', function(){
  gulp.watch(options.src + '/scss/**/*.scss', ['compileSass']);

});

gulp.task('clean', function (){
  del(['dist', 'css/application.css*', 'js/app*.js*']);
});

gulp.task('build', ['minifyScripts', 'compileSass'], function () {
  return gulp.src(['css/application.css', 'js/app.min.js', 'index.html', 'img/**', 'fonts/**'], {base: './'})
    .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['watchFiles'], function () {
  connect.server({port: 3000});
});

gulp.task('default', ['clean'], function(){
  gulp.start('build');
});
