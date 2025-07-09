export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'https://api.digitalfactory.arkeup.com'),
  app: {
    keys: env.array('APP_KEYS'),
  },
});
