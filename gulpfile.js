/*
 * Creating variables, that will hold plugins that we bringing in via node installation
 */
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    coffee = require('gulp-coffee');

var coffeeSources = [
    'components/*.coffee'
];

gulp.task('coffee', function() {
    gulp.src( coffeeSources )
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(concat('keyboard-app.js'))
        .pipe(gulp.dest('dist'))
});

gulp.task('watch', function(){
    gulp.watch(coffeeSources, ['coffee']);
});

gulp.task('default', ['coffee', 'watch']);
