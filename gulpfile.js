const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "src"
        },
        notify: false
    });
});

gulp.task("styles", function() {
   return gulp.src("src/sass/**/*.+(scss|sass)")
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({
        prefix: "",
        suffix: ".min",
        }))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: false }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
})

gulp.task("watch", function() {
   gulp.watch("src/sass/**/*.+(sass|scss)", gulp.parallel("styles"))
   gulp.watch("src/*.html").on("change", browserSync.reload);
})

gulp.task("default", gulp.parallel("watch", "browser-sync", "styles"));