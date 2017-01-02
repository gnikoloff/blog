var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var amdOptimize = require('amd-optimize');

var input = [
    './node_modules/reset.css/reset.css',
    './sass/imports.scss'
];
var dest = './public/stylesheets/';

var jsInput = './js/**/*.js';
var jsDest = '/public/javascript/';

gulp.task('sass', function() {
    gulp.src(input)
    .pipe(sass())
    .pipe(concat('build.css'))
    .pipe(gulp.dest(dest));
});

gulp.task('scripts', function () {
    return gulp.src([
            './main.js'
        ])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./public/javascript/'));
});

gulp.task('default', ['sass', 'scripts'], function() {
    gulp.watch('./sass/**/*.scss', ['sass']);
    //gulp.watch(jsInput, ['scripts']);
});