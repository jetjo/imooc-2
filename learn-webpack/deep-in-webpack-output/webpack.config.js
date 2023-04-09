const path = require('path');

module.exports = {
  mode: 'development',
  devtool: "source-map",
  // devtool: "eval-source-map",
  entry: {
    // main: './es-src/index.js'
    main: './es-cjs-src/index.js'
    // main: './cjs-src/index.js'
    // main: './cjs-es-src/index.js'
  },
  output: {
    // path: path.resolve(__dirname, 'es-dist'),
    path: path.resolve(__dirname, 'es-cjs-dist'),
    // path: path.resolve(__dirname, 'cjs-dist'),
    // path: path.resolve(__dirname, 'cjs-es-dist'),
    filename: '[name]@[contenthash].min.js'
    // filename: '[name]@[contenthash].[extends]'
  }
}
