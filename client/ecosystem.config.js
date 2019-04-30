module.exports = {
  apps: [
    {
      name: 'elky:client',
      script: 'npm -- start',
      args: '',
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
