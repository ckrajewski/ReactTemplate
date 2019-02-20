//...
const CSSLoader = {
    test: /\.css$/,
        use: [
          {
                loader: 'style-loader',
                
            },
            {
                loader: 'css-loader',
                options: { importLoaders: 1 },
            },
            {
                loader: 'postcss-loader',
                options: {
                    config: {
                        path: __dirname + '/postcss.config.js'
                    }
                },
            },
        ],
};
module.exports = {
    CSSLoader: CSSLoader
};