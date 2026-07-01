<?php
/**
 * Головний шаблон теми.
 *
 * @package impax_theme
 */

get_header();
?>

<main id="primary" class="site-main">

<?php
if ( have_posts() ) :
	while ( have_posts() ) :
		the_post();
		the_title( '<h1>', '</h1>' );
		the_content();
	endwhile;
endif;
?>

</main>

<?php
get_footer();
