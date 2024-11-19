<?php
/**
 * navus Theme Customizer
 *
 * @package navus
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function navus_customize_register( $wp_customize ) {
	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';

	if ( isset( $wp_customize->selective_refresh ) ) {
		$wp_customize->selective_refresh->add_partial(
			'blogname',
			array(
				'selector'        => '.site-title a',
				'render_callback' => 'navus_customize_partial_blogname',
			)
		);
		$wp_customize->selective_refresh->add_partial(
			'blogdescription',
			array(
				'selector'        => '.site-description',
				'render_callback' => 'navus_customize_partial_blogdescription',
			)
		);
	}
	$wp_customize->add_section('footer_social_links', array(
        'title'    => __('Footer Social Links', 'thefarmshop'),
        'priority' => 120,
    ));

    // Add Settings and Controls for Each Social Media
    $social_platforms = ['facebook', 'youtube', 'instagram', 'linkedin', 'soundcloud'];

    foreach ($social_platforms as $platform) {
        $wp_customize->add_setting("footer_social_{$platform}", array(
            'default'           => '',
            'sanitize_callback' => 'esc_url_raw',
        ));

        $wp_customize->add_control("footer_social_{$platform}", array(
            'label'    => ucfirst($platform) . ' URL',
            'section'  => 'footer_social_links',
            'settings' => "footer_social_{$platform}",
            'type'     => 'url',
        ));
    }
}
add_action( 'customize_register', 'navus_customize_register' );

/**
 * Render the site title for the selective refresh partial.
 *
 * @return void
 */
function navus_customize_partial_blogname() {
	bloginfo( 'name' );
}

/**
 * Render the site tagline for the selective refresh partial.
 *
 * @return void
 */
function navus_customize_partial_blogdescription() {
	bloginfo( 'description' );
}

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function navus_customize_preview_js() {
	wp_enqueue_script( 'navus-customizer', get_template_directory_uri() . '/js/customizer.js', array( 'customize-preview' ), NAVUS_THEME_VERSION, true );
}
add_action( 'customize_preview_init', 'navus_customize_preview_js' );
