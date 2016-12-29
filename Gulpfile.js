'use strict';

const gulp     = require('gulp'),
      copy     = require('gulp-copy'),
      connect  = require('gulp-connect'),
      uglify   = require('gulp-uglify'),
      sass     = require('gulp-sass'),
      imagemin = require('gulp-imagemin'),
      rename   = require('gulp-rename'),
      concat   = require('gulp-concat'),
      babel    = require('gulp-babel'),
      replace  = require('gulp-replace');

const path = require('path');


/**
 * Files
 */

const vendor = {
  js: [
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/nasa-launcher/dist/Nasa.js'
  ]
};

const scripts = {
  dir: 'assets/scripts',
  files: [
    'utils/*.js',
    'modules/*.js',
    'pages/*.js',
    'launchfile.js'
  ]
};

const styles = {
  dir: 'assets/styles',
  files: [
    '**/*.scss',
    'target.scss'
  ]
};

const fileTypes = 'jpg,png,gif,svg,ico';

const content = {
  markup: [
    'pages/*.{html,php}',
    'pages/partials/*.php',
    'pages/errors/*.php'
  ],
  images: [
    {
      src: `assets/images/src/*.{${fileTypes}}`,
      dest: '/'
    }
  ]
};

const babelPlugins = [
  'transform-es2015-arrow-functions',
  'transform-es2015-block-scoped-functions',
  'transform-es2015-block-scoping',
  'transform-es2015-constants',
  'transform-es2015-destructuring',
  'transform-es2015-for-of',
  'transform-es2015-function-name',
  'transform-es2015-literals',
  'transform-es2015-parameters',
  'transform-es2015-shorthand-properties',
  'transform-es2015-template-literals',
];

function filePaths(fileObj) {
  return fileObj.files.map(file => path.join(fileObj.dir, file));
}

function logError(e) {
  console.error(e.toString());
  this.emit('end');
}


/**
 * Tasks
 */

gulp.task('sass', () => {
  return gulp.src('assets/styles/target.scss')
             .pipe(sass().on('error', sass.logError))
             .pipe(rename('build.css'))
             .pipe(gulp.dest(path.join(styles.dir, 'build')))
             .pipe(connect.reload());
});

gulp.task('transpileScripts', () => {
  return gulp.src(vendor.js.concat(filePaths(scripts)))
             .pipe(babel({plugins: babelPlugins}).on('error', logError))
             .pipe(concat('build.js'))
             .pipe(uglify().on('error', logError))
             .pipe(gulp.dest(path.join(scripts.dir, 'build')))
             .pipe(connect.reload());
});

gulp.task('connect', () => {
  connect.server({
    livereload: true 
  });
});

gulp.task('imagemin', () => {
  return content.images.forEach(pair => {
    gulp.src(pair.src)
        .pipe(imagemin())
        .pipe(gulp.dest(path.join('assets/images/', pair.dest)))
        .pipe(connect.reload());
  });
});

gulp.task('watch', () => {
  gulp.watch(filePaths(styles), ['sass']);
  gulp.watch(filePaths(scripts), ['transpileScripts']);
  content.images.forEach(pair => {
    gulp.watch(pair.src, ['imagemin:default']);
  });
});


/**
 * Triggers
 */

gulp.task('start', [
  'transpileScripts',
  'sass',
  'imagemin',
  'watch',
  'connect'
]);

gulp.task('build', [
  'transpileScripts',
  'sass',
  'imagemin'
]);


gulp.task('default', ['start']);
