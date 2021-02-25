
exports.onCreateWebpackConfig = ({
  actions,
}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.(glb)$/i,
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