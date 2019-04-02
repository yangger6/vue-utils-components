const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    entry: [
        './src/index.ts',
    ],
    output: {
        path: `${__dirname}/lib`,
        filename: 'index.js',
        libraryTarget: 'commonjs',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            { test: /\.vue$/, use: 'vue-loader' },
            { test: /\.less/, use: ["style-loader", "css-loader", "less-loader", "sass-loader"] },
            {
                test: /\.ts$/, loader: 'ts-loader', options: {
                    appendTsSuffixTo: [/\.vue$/],
                    compilerOptions: {
                        declaration: true,
                        declarationDir: "./lib/types",
                    }
                }
            }
        ],
    },
    externals: [
        // include only relative assets
        function (context, request, callback) {
            if (!request.match(/(?:^|!)(?:\.|\.\.)?\//))
                return callback(null, `commonjs ${request}`)
            callback()
        }
    ],
    plugins: [
        new VueLoaderPlugin(),
    ],
}
