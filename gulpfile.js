'use strict';

const gulp = require('gulp');

gulp.task('hello', function () {
  console.log("hello world!");
});

gulp.task('default', ['hello'], function () {
  console.log("The default task!");
})
