const { merge } = require('webpack-merge');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimizer: [
            new ESBuildMinifyPlugin({
                target: 'es2015',
                loader: 'tsx',
                css: true,
            }),
        ],
        moduleIds: 'named',
    },
});
