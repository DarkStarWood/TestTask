var gulp = require("gulp");
    cssnano = require("gulp-cssnano"),
    autoprefixer = require('gulp-autoprefixer'), 
    imagemin = require('gulp-imagemin'), 
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"); 

gulp.task("html", function() {
    return gulp.src("src/*.html")
    .pipe(gulp.dest("dist"));
});

gulp.task("css", function() {
		return gulp.src('src/css/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest("dist/css"));
		
});

gulp.task("scripts", function() {
    return gulp.src("src/js/*.js") 
        .pipe(concat('main.js')) 
        .pipe(uglify()) 
        .pipe(gulp.dest("dist/js"));
});

gulp.task('imgs', function() {
    return gulp.src("src/img/*.+(jpg|jpeg|png|gif)")
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true
        }))
        .pipe(gulp.dest("dist/img"))
});

gulp.task("watch", function() {
    gulp.watch("src/*.html", ["html"]);
    gulp.watch("src/js/*.js", ["scripts"]);
    gulp.watch("src/css/*.css", ["css"]);
    gulp.watch("src/img/*.+(jpg|jpeg|png|gif)", ["imgs"]);
});

gulp.task("default", ["html", "css", "scripts", "imgs", "watch"]);