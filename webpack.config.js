const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const jsonImporter = require("node-sass-json-importer");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: './src/index',
    target: "web",
    mode: "development",
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, './build')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            // изображения
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            // шрифты
            {
                test: /\.(woff(2)?|eot|ttf|otf)$/,
                type: 'asset/inline',
            },
            {
                oneOf: [
                    {
                        test: /\.module\.s[ac]ss$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: "css-loader",
                                options: {
                                    modules: {
                                        exportGlobals: true,
                                        localIdentName: "[local]___[hash:base64:5]",
                                    },
                                },
                            },
                            {
                                loader: "sass-loader",
                                options: {
                                    sassOptions: {
                                        importer: jsonImporter(),
                                    },
                                    webpackImporter: false,
                                },
                            },
                        ],
                    },
                    {
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: "css-loader",
                                options: {
                                    sourceMap: true,
                                },
                            },
                            {
                                loader: "sass-loader",
                                options: {
                                    sassOptions: {
                                        importer: jsonImporter(),
                                    },
                                    sourceMap: true,
                                    webpackImporter: false,
                                },
                            },
                        ],
                    },
                ],
                test: /\.s[ac]ss$/i,
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: ["@svgr/webpack"],
            },
        ],
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'productCatalog',
        template: path.resolve(__dirname, './src/index.html'),
        filename: 'index.html',
    }), new CleanWebpackPlugin(), new MiniCssExtractPlugin()],
    resolve: {
        alias: {
            components: path.resolve(__dirname, "src/components/"),
            entities: path.resolve(__dirname, "src/entities/"),
            store: path.resolve(__dirname, "src/store/"),
            styles: path.resolve(__dirname, "src/styles/"),
            icons: path.resolve(__dirname, "public/icons/"),
        },
        extensions: [".cjs", ".js", ".jsx", ".json", ".ts", ".tsx", ".css", ".scss", ".sass"],
    },
}