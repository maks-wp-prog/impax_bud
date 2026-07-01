<?php
/**
 * Functions and definitions.
 *
 * @package impax_theme
 */

if ( ! defined( 'IMPAX_THEME_VERSION' ) ) {
	define( 'IMPAX_THEME_VERSION', '1.0.0' );
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 */
function impax_theme_setup(): void {
	// Підтримка мультимовності
	load_theme_textdomain( 'impax_theme', get_template_directory() . '/languages' );

	// Динамічний <title>
	add_theme_support( 'title-tag' );

	// Мініатюри записів
	add_theme_support( 'post-thumbnails' );

	// HTML5 розмітка
	add_theme_support( 'html5', [
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
		'style',
		'script',
	] );

	// Підтримка Gutenberg
	add_theme_support( 'align-wide' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'editor-styles' );

	// Реєстрація меню
	register_nav_menus( [
		'primary' => __( 'Головне меню', 'impax_theme' ),
		'footer'  => __( 'Меню в підвалі', 'impax_theme' ),
	] );
}
add_action( 'after_setup_theme', 'impax_theme_setup' );

/**
 * Підключення стилів та скриптів.
 */
function impax_theme_scripts(): void {
	wp_enqueue_style(
		'impax-theme-style',
		get_stylesheet_uri(),
		[],
		IMPAX_THEME_VERSION
	);
}
add_action( 'wp_enqueue_scripts', 'impax_theme_scripts' );
