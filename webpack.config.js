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
            {
                sideEffects: true,
                test: /\.(c|sa|sc)ss$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  {
                    loader: "css-loader",
                    options: {
                      importLoaders: 2,
                      modules: {
                        auto: true,
                        exportGlobals: true,
                        localIdentName: "[name]__[local]--[hash:base64:5]",
                      },
                    },
                  },
                  {
                    loader: "sass-loader",
                    options: { sassOptions: { importer: jsonImporter() } },
                  },
                ],
            },
            {
                test: /\.svg$/,
                use: ["@svgr/webpack"],
            },
            {
                exclude: /node_modules/,
                loader: "file-loader",
                options: {
                  name: "[path][name].[ext]",
                  publicPath: "./",
                },
                test: /\.(svg|jpg|jpeg|png|gif|eot|ttf|woff|woff2)$/,
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
            icons: path.resolve(__dirname, "src/assets/icons/"),
        },
        extensions: [".cjs", ".js", ".jsx", ".json", ".ts", ".tsx", ".css", ".scss", ".sass"],
    },
}