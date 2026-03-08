// Central config for runtime values pulled from Vite/Netlify env.
// Vite exposes env vars prefixed with VITE_ to the client bundle.
export const WP_SITE = import.meta.env.VITE_WORDPRESS_SITE || 'https://public-api.wordpress.com/wp/v2/sites/aspyre7.wordpress.com'

export default {
  WP_SITE
}
