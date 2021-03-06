/**
 * Created by skessler on 12/11/14.
 */

'use strict';

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    to5 = require('gulp-6to5'),
    watch = require('gulp-watch'),
    source = require('vinyl-source-stream');


gulp.task('default', ['styles', 'watch:all']);


gulp.task('6to5', function() {

    gulp.src(['index.html'])
        .pipe(gulp.dest('.es5/'));

    gulp.src(['app/*.html', 'app/**/*.html', 'app/**/*.json'])
        .pipe(gulp.dest('.es5/app'));

    return gulp.src(['app/**/*.js', 'app/*.js'])
        .pipe(to5())
        .pipe(gulp.dest('.es5/app'));
});

gulp.task('watch:6to5', ['6to5'], function() {
    return watch('src/**/*.js', function(files) {
        return files.pipe(to5())
            .pipe(gulp.dest('.es5/'));
    });

});

gulp.task('watch:build', ['6to5'], function() {

    var bundler = watchify(browserify({
        basedir: '.es5/',
        debug: true,
        entries: './app/index.js'
    }));

    bundler.on('update', rebundle);

    function rebundle() {
        gulp.src(['.es5/index.html'])
            .pipe(gulp.dest('./build/'));

        gulp.src(['.es5/app/**/*.json'])
            .pipe(gulp.dest('./build/app'));

        return bundler
            .bundle()
            .pipe(source('index.js'))
            .pipe(gulp.dest('./build/app/'));
    }

    return rebundle();
});

gulp.task('watch:all', ['watch:6to5', 'watch:build']);

gulp.task('styles', function() {
    return gulp.src('./app/app.scss')
        .pipe(sass({
            style: 'expanded'
        }))
        .pipe(gulp.dest('build/app'));
});

gulp.task('prefix', function() {
    return gulp.src('./app/app.scss')
        .pipe(sass({
            style: 'expanded'
        }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('app/'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('app/'))
        .pipe(notify({
            message: 'Styles task complete'
        }));
});

gulp.task('scripts', function() {
    return gulp.src('src/scripts/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('app/'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('app/'))
        .pipe(notify({
            message: 'Scripts task complete'
        }));
});