function resolve(path){
    console.log("==>",path,__dirname + path)
    return __dirname + path;
}

module.exports = {
    mode: 'development',
    //入口
    entry: resolve('/index.ts'),
    //出口
    output: {
        path: resolve('/dist'),
        filename: 'bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader'
                }
            },
        ]
    },
    resolve: {
        extensions: [".ts", ".js"],
        alias: {
            "@": resolve("/src"),
        },
    }
}