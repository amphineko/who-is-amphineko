const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    context: path.resolve(__dirname, 'src'),

    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    },

    devtool: 'inline-source-map',

    entry: {
        index: './index.js',
    },

    module: {
        rules: [
            {
                test: /\.(c|sa|sc)ss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: '[name].[contenthash:8].css',
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: true
                        }
                    },
                    // TODO: might be required to use `resolve-url-loader`
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ],
    },

    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: 'all',
            name: 'vendors',
        }
    },

    output: {
        filename: '[name].[contenthash:8].js',
        path: path.resolve(__dirname, 'dist'),
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            scriptLoading: 'defer',
            template: './index.html'
        })
    ]
}
