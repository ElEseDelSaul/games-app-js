const HtmlWebpackPlugin = require('html-webpack-plugin')
const StyleLoader = require('style-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

const devMode = process.env.NODE_ENV !== 'production'; //En que estado esta el proyecto , Dev o Prod
console.log(devMode)

module.exports = {
    mode:'production',
    entry: './frontend/app.js',
    output: {
        path: path.join(__dirname , 'backend/public'),
        filename: 'js/bundle.js'
    },
    module:{
        rules:[
            {
                test: /\.css/,  //Examina todos los archivos .css
                use: [  //Utiliza style-loader & css-loader para interpretar los estilos
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader, //Si estas en DESARROLLO carga los estilos en JAVASCRIPT , si estas en PRODUCCION carga los estilos en su propio archivo de CSS
                    'css-loader'
                ]
            }
        ]
    },
    plugins:[   //Arreglo de objetos de configuracion
        new HtmlWebpackPlugin({ //Interprete de HTML
            template: './frontend/index.html',
            minify:
            {    //Minificar codigo html
                collapseWhitespace: true,    //Quitar espacios en blanco del html
                removeComments: true,   //Remover comentarios
                removeRedundantAttributes: true,    //Remover codigo redundante de html
                removeScriptTypeAttributes: true,    //Remover tipo de atributos
                removeStyleLinkTypeAttributes: true, //Remover etiqueta link de estilos
                useShortDocType: true
            }
            //filename:'bundle.html'
        }),
        new MiniCssExtractPlugin({  //Interprete de Css
            filename:'css/bundle.css'
        })
    ],
    devtool: 'source-map' //Ayuda para correcciones
}