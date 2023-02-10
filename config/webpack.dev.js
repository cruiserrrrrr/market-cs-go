const { merge } = require('webpack-merge');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [new ReactRefreshPlugin()],
    devServer: {
        hot: true,
        port: 3000,
        historyApiFallback: true,
        proxy: {
            '/api': {
                secure: false,
                changeOrigin: true,
            },
        },
        before: (app) => {
            app.use('/', (req, res, next) => {
                next();
            });
        },
    },
});
