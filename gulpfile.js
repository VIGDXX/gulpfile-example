'use strict';
 
var gulp = require('gulp');
var jade = require('gulp-jade');

var sass = require('gulp-sass');
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var fs = require('fs'); 

function deleteall(path) {  
    var files = [];  
    if(fs.existsSync(path)) {  
        files = fs.readdirSync(path);  
        files.forEach(function(file, index) {  
            var curPath = path + "/" + file;  
            if(fs.statSync(curPath).isDirectory()) { // recurse  
                deleteall(curPath);  
            } else { // delete file  
                fs.unlinkSync(curPath);  
            }  
        });  
        fs.rmdirSync(path);  
    }  
};

gulp.task('jade',function() {
    deleteall('./dist/html')
    gulp.src('./src/jade/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./dist/html'))
})

gulp.task('sass', function () {
    deleteall('./dist/css')
    return gulp.src('./src/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(postcss([ autoprefixer()]))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('copy',function() {
    deleteall('./dist/js')
    deleteall('./dist/img')
    deleteall('./dist/lib')
    gulp.src('./src/js/**/*.js')
        .pipe(gulp.dest('./dist/js'))
    gulp.src('./src/lib/**/*')
        .pipe(gulp.dest('./dist/lib'))
    gulp.src('./src/img/*')
        .pipe(gulp.dest('./dist/img'))
})

gulp.task('sass:watch', function () {
    gulp.watch('./src/scss/*.scss', ['sass']);
});
gulp.task('jade:watch', function () {
    gulp.watch('./src/jade/**/*.jade', ['jade']);
});
gulp.task('copy:watch', function () {
    gulp.watch(['./src/js/**/*.js','./src/lib/**/*','./src/img/*'], ['copy']);
});

gulp.task('default',['jade','jade:watch','sass','sass:watch','copy','copy:watch']);