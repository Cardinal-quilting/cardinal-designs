const path = require('path');

module.exports = {
    mode: 'development', // or 'production'

  resolve: {
    
    alias: {
      '@': path.resolve(__dirname, 'src'), // '@' alias for the 'src' directory
    },
  },
};