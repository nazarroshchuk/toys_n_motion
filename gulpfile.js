let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify-es').default,
    concat = require('gulp-concat'),
    rename = require('gulp-rename');


gulp.task('scss', function(){
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'})) //expanded
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('html', function(){
    return gulp.src('app/*.html')
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('allscripts', function(){
    return gulp.src('app/js/*.js')
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function(){
    return gulp.src('app/scripts/**/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream: true})); 
});

gulp.task('js', function(){
    return gulp.src([
        // 'node_modules/slick-carousel/slick/slick.js',
        // 'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
        'node_modules/jquery/dist/jquery.js',
        // 'node_modules/@popperjs/dist/cjs/popper.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'node_modules/@fortawesome/fontawesome-free/js/all.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

gulp.task('watch', function(){
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch('app/*.html', gulp.parallel('html'));
    gulp.watch('app/scripts/**/*.js', gulp.parallel('scripts'));
    gulp.watch('app/js/**/*.js', gulp.parallel('allscripts'));
}); 

gulp.task('default', gulp.parallel('scss', 'scripts', 'js', 'browser-sync', 'watch'));