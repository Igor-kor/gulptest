'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var twig = require('gulp-twig');
var browserSync = require('browser-sync');
var pages = ['index','about'];


gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
.pipe(sass().on('error', sass.logError))
.pipe(gulp.dest('./public/css/'))
.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', function () {
    gulp.watch('./src/sass/**/*.scss', gulp.series('sass'));
    gulp.watch('./src/twig/**/*.twig', gulp.series('twig'));
});

gulp.task('browser-sync', function ( ) {
    var files = [
        './public/**/*.css',
        './public/**/*.png',
        './public/**/*.js'
    ];
    for (var i = 0; i < pages.length; i++) {
        files.push('./public/' + pages[i] + '.html');
    }
    console.log(pages);
    browserSync.init(files, {
        server: {
            baseDir: './public/',
        }
    });
});

gulp.task('twig', function () {
    var files = [];
    for (var i = 0; i < pages.length; i++){
        files.push('./src/twig/'+pages[i]+'.twig');
    }
    return gulp.src(files)
    // Stay live and reload on error
        .pipe(twig())
        .on('error', function (err) {
            process.stderr.write(err.message + '\n');
            this.emit('end');
        })
        .pipe(gulp.dest('./public/'))
        .pipe(browserSync.reload({stream: true}));
});