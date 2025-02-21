const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: process.env.NODE_ENV || "production",
	target: "electron-renderer",
	entry: path.resolve(__dirname, "./src/index.tsx"),
	output: { path: __dirname + "/build/" },
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				resolve: { extensions: [".js", ".ts", ".tsx"] },
				use: "ts-loader",
			},
			{
				test: /\.css$/i,
				use: [{ loader: "style-loader" }, { loader: "css-loader" }],
			},
		],
	},
	plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
	devtool: "source-map",
};
