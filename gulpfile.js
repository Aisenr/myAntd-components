const fs = require('fs');
const babel = require('gulp-babel');
const gulp = require('gulp');
const merge2 = require('merge2');
const path = require('path');
const through2 = require('through2');
const transformLess = require('atool-build/lib/transformLess');
const rimraf = require('rimraf');
const replace = require('gulp-replace');
const stripCode = require('gulp-strip-code');

const babelConfig = JSON.parse(fs.readFileSync('./.babelrc'));

const cwd = process.cwd();
const libDir = path.join(cwd, 'lib');
const esDir = path.join(cwd, 'es');

function babelify(js, modules) {
  delete babelConfig.cacheDirectory;

  let stream = js.pipe(babel(babelConfig))
    .pipe(through2.obj(function z(file, encoding, next) {
      this.push(file.clone());
      if (file.path.match(/[/\\]style[/\\]index\.js/)) {
        const content = file.contents.toString(encoding);
        if (content.indexOf('\'react-native\'') !== -1) {
          // actually in antd-mobile@2.0, this case will never run,
          // since we both split style/index.mative.js style/index.js
          // but let us keep this check at here
          // in case some of our developer made a file name mistake ==
          next();
          return;
        }
        file.contents = new Buffer(content
          .replace(/\/style\/?'/g, '/style/css\'')
          .replace(/\.less/g, '.css'));
        file.path = file.path.replace(/index\.js/, 'css.js');
        this.push(file);
        next();
      } else {
        next();
      }
    }));
  if (!modules) {
    stream = stream.pipe(stripCode({
      start_comment: '@remove-on-es-build-begin',
      end_comment: '@remove-on-es-build-end',
    }));
  }
  return stream.pipe(gulp.dest(modules === false ? esDir : libDir));
}

gulp.task('build', (modules) => {
  rimraf.sync(modules !== false ? libDir : esDir);
  const less = gulp.src(['components/**/*.less'])
    .pipe(through2.obj(function (file, encoding, next) {
      // this.push(file.clone());
      if (file.path.match(/[/\\]style[/\\]index\.less$/)) {
        transformLess(file.path).then((css) => {
          file.contents = new Buffer(css);
          file.path = file.path.replace(/\.less$/, '.css');
          this.push(file);
          next();
        }).catch((e) => {
          console.error(e);
        });
      } else {
        next();
      }
    }))
    .pipe(gulp.dest(modules === false ? esDir : libDir));

  const assets = gulp.src(['components/**/*.@(png|svg|css)']).pipe(gulp.dest(modules === false ? esDir : libDir));

  const jsFilesStream = babelify(gulp.src('components/**/*.js'), modules);

  return merge2([less, assets, jsFilesStream]);
});
