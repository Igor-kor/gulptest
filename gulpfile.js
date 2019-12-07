'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var twig = require('gulp-twig');
var browserSync = require('browser-sync');
gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
.pipe(sass().on('error', sass.logError))
.pipe(gulp.dest('./public/css/'))
});

gulp.task('watch', function () {
    gulp.watch('./src/sass/**/*.scss', gulp.series('sass'));
    gulp.watch('./src/twig/**/*.twig', gulp.series('twig'));
});



gulp.task('browser-sync', function () {
    var files = [
        './public/index.html',
        './public/**/*.css',
        './public/**/*.png',
        './public/**/*.js'
    ];

    browserSync.init(files, {
        server: {
            baseDir: './public/'
        }
    });
});

gulp.task('twig', function () {
    return gulp.src(['./src/twig/index.twig'])
    // Stay live and reload on error
        .pipe(twig())
        .on('error', function (err) {
            process.stderr.write(err.message + '\n');
            this.emit('end');
        })
        .pipe(gulp.dest('./public/'));
});