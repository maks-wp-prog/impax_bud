<?php
/**
 * Шапка сайту.
 *
 * @package impax_theme
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="header" id="header">
    <div class="container header__inner">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="header__logo">
            <span class="header__logo-text">Impax</span>
            <span class="header__logo-accent">.Bud</span>
        </a>

        <nav class="header__nav">
            <?php
            if ( has_nav_menu( 'primary' ) ) {
                wp_nav_menu( [
                    'theme_location' => 'primary',
                    'menu_class'     => 'header__menu',
                    'container'      => false,
                    'fallback_cb'    => false,
                ] );
            }
            ?>
        </nav>

        <button class="header__burger" aria-label="<?php esc_attr_e( 'Menu', 'impax_theme' ); ?>">
            <span></span><span></span><span></span>
        </button>
    </div>
</header>

<main id="primary" class="site-main">
