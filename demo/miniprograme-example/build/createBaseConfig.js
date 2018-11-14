const createMegaloTarget = require( '@megalo/target' )
const compiler = require( '@megalo/template-compiler' )
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )
const VueLoaderPlugin = require( 'vue-loader/lib/plugin' )
const _ = require( './util' );

function createBaseConfig( platform = 'wechat' ) {
  const cssExt = platform === 'alipay' ? 'acss' : 'wxss'
  return {
    mode: 'development',

    target: createMegaloTarget( {
      compiler: Object.assign( compiler, { } ),
      platform,
      htmlParse: {
        templateName: 'octoParse',
        src: _.resolve(`./node_modules/octoparse/lib/platform/${platform}`)
      }
    } ),

    entry: {
      'app': _.resolve( 'src/index.js' ),
      'pages/index/index': _.resolve( 'src/pages/index/index.js' )
    },

    output: {
      path: _.resolve( `dist-${platform}/` ),
      filename: 'static/js/[name].js',
      chunkFilename: 'static/js/[id].js'
    },

    devServer: {
      // hot: true,
    },

    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]|megalo[\\/]/,
            name: 'vendor',
            chunks: 'all'
          }
        }
      }
    },

    // devtool: 'cheap-source-map',
    devtool: false,

    resolve: {
      extensions: ['.vue', '.js', '.json'],
      alias: {
        // 'vue': _.resolve('../megalo/dist/megalo.mp.esm'),
        'vue': 'megalo',
        '@': _.resolve('src')
      },
      // https://webpack.docschina.org/configuration/resolve/#resolve-aliasfields
      aliasFields: ['browser'],
    },

    module: {
      rules: [
        // ... other rules
        {
          test: /\.vue$/,
          use: [
            {
              loader: 'vue-loader',
              options: {
                a: 1,
                cacheIdentifier: 'x'
              }
            }
          ]
        },

        {
          test: /\.js$/,
          use: 'babel-loader'
        },

        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },

        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'less-loader',
          ]
        }
      ]
    },

    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin( {
        filename: `./static/css/[name].${cssExt}`,
      } ),
    ]
  }
}

module.exports = createBaseConfig
