const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');

// 开发环境
gulp.task('builddev', () => {
    return watch('./src/nodeuii/**/*.js', {
        ignoreInitial: false
    }, () => {
        gulp.src('./src/nodeuii/**/*.js')
            .pipe(babel({
                babelrc: false,
                "plugins": [
                    "transform-decorators-legacy",
                    "transform-es2015-modules-commonjs"
                ]
            }))
            .pipe(gulp.dest('./build/'))
    })
});

// 上线环境
gulp.task('buildprod', () => {
    gulp.src('src/nodeuii/**/*.js')
        .pipe(babel({
            babelrc: false,
            "plugins": [
                "transform-decorators-legacy",
                "transform-es2015-modules-commonjs"
            ]
        }))
        .pipe(gulp.dest('./build/'))
});

const _flag = (process.env.NODE_ENV == "production");

gulp.task('default', _flag ? ["buildprod"] : ["builddev"])