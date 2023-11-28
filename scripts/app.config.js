module.exports = {
  apps: [
    {
      name: 'upload-pdf-api',
      script: 'node',
      args: 'dist/main',
      env: {
        PORT: 1412,
      },
    },
  ],
};
