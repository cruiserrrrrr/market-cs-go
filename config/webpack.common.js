const path = require('path');
const glob = require('glob').sync;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const StyleExtract = require("mini-css-extract-plugin")
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

module.exports = {
    entry: {
        index: './src/index.tsx',
        icons: glob('./src/assets/sprite/*.svg')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: '[name]-[chunkhash].js',
        publicPath: 'auto',
        clean: true,
    },
    target: 'web',
    resolve: {
        extensions: ['.js', 'jsx', '.ts', '.tsx', '.scss'],
    },
    module: {
        rules: [
            {
                test: /\\.(js|jsx)$/,
                loader: 'esbuild-loader',
                options: {
                    loader: 'jsx',
                    target: 'es2015',
                },
            },
            {
                test: /\.(tsx|ts)$/,
                loader: 'esbuild-loader',
                options: {
                    loader: 'tsx',
                    target: 'es2015',
                },
            },
            {
                test: /\.(sc|sa)ss$/i,
                exclude: path.resolve(__dirname, '../src/index.scss'),
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[folder]__[local]',
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.scss$/i,
                include: path.resolve(__dirname, '../src/index.scss'),
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.svg$/,
                include: path.resolve(__dirname, '../src/assets/sprite'),
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                            spriteFilename: 'icons/sprite.svg',
                        },
                    },
                    'svgo-loader',
                ],
            },
            {
                test: /\.svg$/,
                include: path.resolve(__dirname, '../src/assets/icons'),
                use: [
                    'file-loader',
                    'svgo-loader',
                ],
            },
            {
                test: /\.(png|jpg|gif)$/i,
                dependency: { not: ['url'] },
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        }
                    },
                ],
                type: 'javascript/auto'
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'testovoeDanilaNuzhdov',
            template: "src/index.html",
            publicPath: '/'
        }),
        new Dotenv,
        new webpack.DefinePlugin({
            process: {env: {}}
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development"),
            },
        }),
        new MiniCssExtractPlugin,
        new SpriteLoaderPlugin(),
    ],
};
