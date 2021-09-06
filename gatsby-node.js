
exports.onCreateWebpackConfig = ({
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        "fs": false,
        "tls": false,
        "net": false,
        "path": false,
        "zlib": false,
        "http": false,
        "https": false,
        "stream": require.resolve('stream-browserify'),
        "crypto": require.resolve('crypto-browserify'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(glb|vtt)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
  })
}