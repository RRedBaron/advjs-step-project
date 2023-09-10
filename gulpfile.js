const { src, dest, watch, series } = require("gulp");
const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const clean = require("gulp-clean");
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify-es").default;
const browsersync = require("browser-sync").create();
const htmlmin = require("gulp-htmlmin");

const paths = {
  build: {
    html: "./index.html",
    css: "./dist/css/",
    js: "./dist/js/",
    img: "./dist/assets/",
  },
  src: {
    html: "./src/index.html",
    scss: "./src/**/*.scss",
    js: "./src/**/*.js",
    img: "./src/assets/**/*.{jpg,png,svg,gif,ico,webp}",
  },
  base: "./src",
  clean: "./dist",
};

function html() {
  return src(paths.src.html)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("./dist"));
}

function styles() {
  return src(paths.src.scss)
    .pipe(scss())
    .pipe(concat("style.min.css"))
    .pipe(autoprefixer())
    .pipe(dest(paths.build.css))
    .pipe(browsersync.stream());
}

function scripts() {
  return src(paths.src.js)
    .pipe(concat("script.min.js"))
    .pipe(uglify())
    .pipe(dest(paths.build.js))
    .pipe(browsersync.stream());
}

function images() {
  return src(paths.src.img, { allowEmpty: true })
    .pipe(dest(paths.build.img))
    .pipe(browsersync.stream());
}

function cleanDist() {
  return src(paths.clean, { allowEmpty: true, read: false }).pipe(clean());
}

function browserSync() {
  browsersync.init({
    server: {
      baseDir: "./",
    },
    port: 3000,
    notify: false,
  });
  watch([paths.src.scss], styles).on("change", browsersync.reload);
  watch([paths.src.js], scripts).on("change", browsersync.reload);
  watch([paths.src.img]).on("change", browsersync.reload);
  watch([paths.src.html]).on("change", browsersync.reload);
}

exports.build = series(cleanDist, html, styles, scripts, images);
exports.default = browserSync;
