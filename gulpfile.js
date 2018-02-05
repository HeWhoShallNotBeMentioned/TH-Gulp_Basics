'use strict';

const gulp    = require('gulp');
const uglify  = require('gulp-uglify');
const rename  = require('gulp-rename');
const sass    = require('gulp-sass');
const maps    = require('gulp-sourcemaps');
const del     = require('del');
const connect = require('gulp-connect');
const useref  = require('gulp-useref');
const iff     = require('gulp-if');
const csso    = require('gulp-csso');
var options = {
  src: 'src',
  dist: 'dist'
};

// gulp.task('minifyScripts',['concatScripts'] , function (){
//   return gulp.src("js/app.js")
//   .pipe(uglify())
//   .pipe(rename('app.min.js'))
//   .pipe(gulp.dest('js'));
// });

// gulp.task("compileSass", function(){
//   return gulp.src("scss/application.scss")
//   .pipe(maps.init())
//   .pipe(sass())
//   .pipe(maps.write('./'))
//   .pipe(gulp.dest('css'));
// });

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

gulp.task('html', function () {
    return gulp.src('src/index.html')
        .pipe(useref())
        .pipe(iff('*.js', uglify()))
        .pipe(iff('*.css', csso()))
        .pipe(gulp.dest(options.dist));
});

gulp.task('build', ['html'], function () {
  return gulp.src([options.src + '/img/**', options.src +'/fonts/**'], {base: options.src})
    .pipe(gulp.dest(options.dist));
});

gulp.task('serve', ['watchFiles'], function () {
  connect.server({port: 3000});
});

gulp.task('default', ['clean'], function(){
  gulp.start('build');
});
