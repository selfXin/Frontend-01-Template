const path = require('path')

module.exports = {
    entry: './main.js',
    mode: 'development',
    optimization: {
        minimize: false
    },
    devServer:{
    	port:8000,

	    host:'localhost',

	    overlay:{

	      errors:true

	    },

	    // open:true  //每次都打开一个网页

	    hot:true //只渲染一个组件
    },
    module: {
        rules: [
            { 
                test: /\.js$/, 
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [[
                            "@babel/plugin-transform-react-jsx",
                            {pragma:"create"}
                        ]]
                    }
                }
            },
            {
                test: /\.css/,
                use:{
                    loader: require.resolve("./cssLoader.js")
                }
            }
        ]
    },
    mode:'development',
    optimization:{
    	minimize:false
    }
}