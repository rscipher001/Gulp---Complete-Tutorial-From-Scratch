var gulp = require('gulp'),
  autoprefixer = require('autoprefixer'),
  bs = require('browser-sync').create(),
  minifycss = require('gulp-clean-css'),
  minifyhtml = require('gulp-minify-html'),
  minifyjs = require('gulp-uglify'),
  postcss = require('gulp-postcss'),
  pug = require('gulp-pug'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps');

gulp.task('default', function() {
  console.log("Hello Gulp!");
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.+(sass|scss)')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss( [autoprefixer] ))
    .pipe(gulp.dest('./src/css'))
    .pipe(bs.reload({
     stream: true
   }));
});

gulp.task('pug', function () {
  return gulp.src('./src/pug/**/*.+(jade|pug)')
    .pipe(pug({
      'pretty': true
    }))
    .pipe(gulp.dest('./src'))
    .pipe(bs.reload({
     stream: true
   }));
});

gulp.task('watch',['pug','sass','bs'], function() {
  gulp.watch(['./src/sass/**/*.+(sass|scss)'], ['sass']);
  gulp.watch(['./src/pug/**/*.+(jade|pug)'], ['pug']);
});

gulp.task('bs', function() {
      bs.init({
        server: {
            baseDir: "./src"
        },
        ui: false,
        online: false
    });
});

gulp.task('minify-css', function() {
  gulp.src('./src/css/**/*.css')
    .pipe(minifycss({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('minify-html', function() {
  gulp.src('./src/**/*.html')
    .pipe(minifyhtml())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('minify-js', function () {
  gulp.src('./src/js/**/*.js')
    .pipe(minifyjs())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('fonts', function() {
  return gulp.src('./src/fonts/**/*')
  .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('img', function() {
  return gulp.src('./src/img/**/*')
  .pipe(gulp.dest('./dist/img'));
});

gulp.task('build',['minify-html','minify-css','minify-js','fonts','img'],function(){
  console.log("Building...");
});
