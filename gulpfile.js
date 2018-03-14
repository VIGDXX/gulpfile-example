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
    gulp.src('./src/jade/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./dist/html'))
})

gulp.task('sass', function () {
    deleteall('./dist')
    return gulp.src('./src/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(postcss([ autoprefixer()]))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./src/scss/*.scss', ['sass']);
});
gulp.task('jade:watch', function () {
    gulp.watch('./src/jade/*.jade', ['jade']);
});

gulp.task('default',['jade','jade:watch','sass','sass:watch']);