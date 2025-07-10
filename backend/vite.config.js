const { mergeConfig } = require('vite');

module.exports = (config) => {
  return mergeConfig(config, {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    server: {
      allowedHosts: [
        'api.digitalfactory.arkeup.com',
        'localhost',
        '127.0.0.1',
        '.arkeup.com'
      ]
    },
  });
};
