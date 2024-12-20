<?php
/**
 * navus functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package navus
 */

if ( ! defined( 'NAVUS_THEME_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( 'NAVUS_THEME_VERSION', '1.0.0' );
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function navus_setup() {
	/*
		* Make theme available for translation.
		* Translations can be filed in the /languages/ directory.
		* If you're building a theme based on navus, use a find and replace
		* to change 'navus' to the name of your theme in all the template files.
		*/
	load_theme_textdomain( 'navus', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
		* Let WordPress manage the document title.
		* By adding theme support, we declare that this theme does not use a
		* hard-coded <title> tag in the document head, and expect WordPress to
		* provide it for us.
		*/
	add_theme_support( 'title-tag' );

	/*
		* Enable support for Post Thumbnails on posts and pages.
		*
		* @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		*/
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus(
		array(
			'primary-menu' => esc_html__( 'Primary', 'navus' ),
			'footer-menu' => esc_html__( 'Footer', 'navus' ),
		)
	);

	/*
		* Switch default core markup for search form, comment form, and comments
		* to output valid HTML5.
		*/
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	// Set up the WordPress core custom background feature.
	add_theme_support(
		'custom-background',
		apply_filters(
			'navus_custom_background_args',
			array(
				'default-color' => 'ffffff',
				'default-image' => '',
			)
		)
	);

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

	/**
	 * Add support for core custom logo.
	 *
	 * @link https://codex.wordpress.org/Theme_Logo
	 */
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		)
	);
	add_theme_support( 'editor-styles' );
}
add_action( 'after_setup_theme', 'navus_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function navus_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'navus_content_width', 640 );
}
add_action( 'after_setup_theme', 'navus_content_width', 0 );


/**
 * Enqueue scripts and styles.
 */
function navus_scripts() {
	wp_enqueue_style( 'navus-style', get_stylesheet_uri(), array(), NAVUS_THEME_VERSION );
	wp_enqueue_style( 'navus-bootstrap-css', get_stylesheet_directory_uri() . '/css/bootstrap.min.css', array(), NAVUS_THEME_VERSION);
	wp_enqueue_style( 'navus-swiper-css', get_stylesheet_directory_uri() . '/css/swiper.min.css', array(), NAVUS_THEME_VERSION);
	wp_enqueue_style( 'navus-main-css', get_stylesheet_directory_uri() . '/css/main.css', array(), NAVUS_THEME_VERSION);
	wp_enqueue_style( 'navus-blocks-css', get_stylesheet_directory_uri() . '/css/blocks.css', array(), NAVUS_THEME_VERSION);

	wp_enqueue_script('jquery');
	wp_enqueue_script( 'navus-bootstrap-min', get_template_directory_uri() . '/js/bootstrap.min.js', array(), NAVUS_THEME_VERSION, true );
	wp_enqueue_script( 'navus-swiper-js', get_stylesheet_directory_uri() . '/js/swiper.min.js', array(), NAVUS_THEME_VERSION, true );
	wp_enqueue_script( 'navus-main', get_template_directory_uri() . '/js/main.js', array(), NAVUS_THEME_VERSION, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'navus_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}


/**
 * Action Hooks
 */
add_action( 'enqueue_block_editor_assets', 'navus_enqueue_block_editor_assets' );
function navus_enqueue_block_editor_assets() {
	// Make paths variables so we don't write em twice ;)
	$block_path = '/blocks/js/editor.blocks.js';
	// $style_path = '/assets/css/blocks.editor.css';

	// Enqueue the bundled block JS file
	wp_enqueue_script(
		'navus-blocks',
		get_template_directory_uri(  ) . $block_path,
		[ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor' ],
	);
	wp_enqueue_style( 'navus-bootstrap-css', get_stylesheet_directory_uri() . '/css/bootstrap.min.css', array(), NAVUS_THEME_VERSION);
	wp_enqueue_style( 'navus-blocks-css', get_stylesheet_directory_uri() . '/css/blocks.css', array(), NAVUS_THEME_VERSION);
	wp_enqueue_script( 'navus-bootstrap-min', get_template_directory_uri() . '/js/bootstrap.min.js', array(), NAVUS_THEME_VERSION, true );



}
function navus_block_category( $categories ) {
    // Add the new category to the array of categorie
    $category = array(
        'slug'  => 'navus-blocks',
        'title' => __( 'Navus', 'navus' ),
    );
	array_unshift($categories, $category);
    return $categories;
}

add_filter( 'block_categories', 'navus_block_category', 10, 2 );