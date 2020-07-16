const gulp = require("gulp");
const jshint = require("gulp-jshint");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const babel = require("gulp-babel");

function style(done) {
  return gulp
    .src(["./resources/scss/bootstrap.scss", "./resources/scss/style.scss"])
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("public/css"))
    .pipe(browserSync.stream());
  done();
}

function bootstrapScript(done) {
  return gulp
    .src([
      "node_modules/bootstrap/dist/js/bootstrap.min.js",
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/popper.js/dist/umd/popper.min.js",
    ])
    .pipe(gulp.dest("public/js"))
    .pipe(browserSync.stream());
  done();
}

function lint(done) {
  return gulp
    .src("./resources/js/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter("default"));
  done();
}

function scripts(done) {
  return gulp
    .src("./resources/js/*.js")
    .pipe(babel())
    .pipe(concat("app.js"))
    .pipe(rename("app.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("public/js"));
  done();
}

function watch(done) {
  browserSync.init({
    server: {
      baseDir: "./public",
      index: "./index.html",
    },
  });

  gulp
    .watch(["./resources/scss/*.scss"])
    .on("change", gulp.series(style, browserSync.reload));
  gulp
    .watch(["./resources/js/*.js"])
    .on("change", gulp.series(lint, scripts, browserSync.reload));
  gulp.watch(["./public/*.html"]).on("change", gulp.series(browserSync.reload));
  done();
}

exports.watch = watch;

gulp.task("default", gulp.series(style, bootstrapScript, lint, scripts, watch));
