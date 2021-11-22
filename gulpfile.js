'use strict'

var gulp = require('gulp'),
	sass = require('gulp-sass')(require('sass')),
	cssmin = require('gulp-cssmin'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	del = require('del'),
	image = require('gulp-image'),
	svgSprite = require('gulp-svg-sprite'),
	htmlmin = require('gulp-htmlmin')

gulp.task('css', () => {
	gulp.src('src/scss/*.scss')
		.pipe(sass())
		.pipe(autoprefixer('last 2 versions', '> 1%'))
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('build/assets/css'))
})

gulp.task('clean', () => {
    del.sync('build')
})

gulp.task('js', () => {
	gulp.src('src/js/*.js')
		.pipe(rename({basename: 'main', suffix: '.min', extname: '.js'}))
		.pipe(uglify())	
		.pipe(gulp.dest('build/assets/js'))
})

gulp.task('images', () => {
	gulp.src('src/img/*.png')
	.pipe(image())
	.pipe(gulp.dest('build/assets/img'))
})

gulp.task('svgSprite', () => {
	gulp.src('src/img/*.svg')
	.pipe(svgSprite({
		mode: {
			stack: {
				sprite: "../icons/icons.svg",
				example: true
			}
		}
	}))
	.pipe(gulp.dest('build/assets/img'))
})

gulp.task('html', () => {
	gulp.src('src/index.html')
	.pipe(htmlmin({ collapseWhitespace: true }))
	.pipe(gulp.dest('build'))
})

gulp.task('default', ['clean', 'css', 'js', 'images', 'svgSprite', 'html'])