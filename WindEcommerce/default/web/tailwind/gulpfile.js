//imports
const gulp = require('gulp');
const bs = require('./gulp/tasks/browserSync');
const wind = require('./gulp/tasks/buildTailWind');

// helpers

/* task build will generate final production assets */


/* task server will generate files for development daily-basis */



gulp.task('watch', function (bs) {
    bs();
    return gulp.watch('./styles/styles.scss', gulp.series('sass')).on(
        'change',
        bs.reload
    )
})

gulp.task('serve', function () {
    const postcss = require('gulp-postcss')
    return gulp
        .src('./styles/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(
            postcss([
                require('postcss-import'),
                require('tailwindcss'),
                require('autoprefixer'),
            ])
        )
        .pipe(gulp.dest('web/css'))
        .pipe(browserSync.stream())
})

// gulp.task('build', gulp.series('serve watch'))

gulp.task('default', gulp.series('serve watch'))