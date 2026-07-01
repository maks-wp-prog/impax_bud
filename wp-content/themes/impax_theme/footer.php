<?php
/**
 * Підвал сайту.
 *
 * @package impax_theme
 */
?>

</main><!-- #primary -->

<footer class="footer">
    <div class="container footer__inner">
        <div class="footer__col">
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="footer__logo">
                <span class="footer__logo-text">Impax</span>
                <span class="footer__logo-accent">.Bud</span>
            </a>
            <p class="footer__desc">
                <?php esc_html_e( 'Yaroslav Boliuk', 'impax_theme' ); ?><br>
                <?php esc_html_e( 'Firma budowlana z Białołęki.', 'impax_theme' ); ?><br>
                <?php esc_html_e( 'Budowa, remonty, wykończenia — solidnie i na czas.', 'impax_theme' ); ?>
            </p>
        </div>

        <div class="footer__col">
            <h4 class="footer__title"><?php esc_html_e( 'Usługi', 'impax_theme' ); ?></h4>
            <?php
            if ( has_nav_menu( 'footer' ) ) {
                wp_nav_menu( [
                    'theme_location' => 'footer',
                    'menu_class'     => 'footer__list',
                    'container'      => false,
                    'fallback_cb'    => false,
                ] );
            }
            ?>
        </div>

        <div class="footer__col">
            <h4 class="footer__title"><?php esc_html_e( 'Kontakt', 'impax_theme' ); ?></h4>
            <ul class="footer__list">
                <li><a href="tel:+48000000000" class="footer__link">+48 000 000 000</a></li>
                <li><a href="mailto:impax.bud@gmail.com" class="footer__link">impax.bud@gmail.com</a></li>
                <li class="footer__link">ul. Dziatwy lok. 9<br>03-009 Warszawa</li>
            </ul>
        </div>
    </div>
    <div class="footer__bottom">
        <p>&copy; <?php echo date( 'Y' ); ?> Impax.Bud Yaroslav Boliuk.</p>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
