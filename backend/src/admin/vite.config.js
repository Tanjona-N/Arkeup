const { mergeConfig } = require('vite');

module.exports = (config) => {
  // Important: always return the modified config
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
        '.arkeup.com' // Permet tous les sous-domaines d'arkeup.com
      ]
    },
  });
};
