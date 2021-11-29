const webpack = require('webpack');
const path = require('path');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ArcGISPlugin = require('@arcgis/webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

/**
 *
 * COMMON CONFIGURATION
 *
 */
const commonConfig = {
  // Set the proper webpack "mode" dependent on the NODE_ENV environment flag
  mode: isDevelopment ? 'development' : 'production',

  // Resolve all paths relative to the 'src' directory
  //context: path.resolve(__dirname, 'src'),

  // Set the "entry" point for webpack to inspect the dependency tree
  entry: {
    index: './src/index.tsx',
  },

  //Application output location
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath: '',
  },

  // Where to look for the various modules, and what type
  // of file extensions should we look for
  resolve: {
    modules: [path.resolve(__dirname, '/src'), 'node_modules/'],
    extensions: ['.mjs', '.ts', '.tsx', '.js', '.jsx'],
  },

  // Rules for how to "parse" the files used throughout the app
  // The "loaders" are node modules that allow to understand
  // how to preprocess files
  module: {
    rules: [
      // Rules for CSS files
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // Rules for SASS/SCSS files
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      // Rules for Typescript files
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      // Rules for static files, such as images
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },

  // Plugins are executed top down in the order they are listed.
  // While loaders are used to transform certain types of modules,
  // plugins can be leveraged to perform a wider range of tasks like
  // bundle optimization, asset management and injection of environment
  // variables.
  plugins: [
    // Analyze bundle
    // new BundleAnalyzerPlugin(),

    // Only keep specified locales
    // This still creates locale chunks, but I can't find a way
    // around this and it is assumed they'll only load if needed
    new MomentLocalesPlugin({
      localesToKeep: ['es-us'],
    }),

    // Clean contents of "dist" folder
    new CleanWebpackPlugin(),

    // Copies files/folders from/to bundled locations
    new CopyPlugin({ patterns: [{ from: 'sampleData', to: 'sampleData' }] }),

    new ArcGISPlugin({
      // The sketch widget requires the 3d widget
      // features: {
      //   '3d': false,
      // },
      locales: ['en-US'],
      userDefinedExcludes: [
        '@arcgis/core/layers/BingMapsLayer',
        '@arcgis/core/layers/CSVLayer',
        '@arcgis/core/layers/GeoRSSLayer',
        '@arcgis/core/layers/ImageryLayer',
        '@arcgis/core/layers/KMLLayer',
        '@arcgis/core/layers/MapImageLayer',
        '@arcgis/core/layers/OpenStreetMapLayer',
        '@arcgis/core/layers/StreamLayer',
        '@arcgis/core/layers/WMSLayer',
        '@arcgis/core/layers/WMTSLayer',
        '@arcgis/core/layers/WebTileLayer',
        '@arcgis/core/layers/ImageryTileLayer',
      ],
    }),

    // Inject the bundles into the distribution index.html
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
};

/**
 *
 * LOCAL DEVELOPMENT CONFIGURATION
 *
 */
const developmentConfig = {
  devtool: 'source-map',

  optimization: {
    moduleIds: 'named',
  },

  plugins: [
    new ReactRefreshPlugin(),
    // Enable HMR globally
    new webpack.HotModuleReplacementPlugin(),
  ],

  // Setup development server
  devServer: {
    hot: true,
    open: false,
    port: 8080,
    historyApiFallback: true,
  },
};

/**
 *
 * PRODUCTION CONFIGURATION
 *
 */
const productionConfig = {
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        // esriVendor: {
        //   test: /[\\/]node_modules[\\/](@arcgis)[\\/]/,
        //   name: 'esri',
        // },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial', // Remove this line if you don't want a single common vendors chunk
          name: 'vendors', // Remove this line if you don't want a single common vendors chunk
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};

/**
 *
 * MERGE THE COMMON CONFIG INTO EITHER DEV OR PRODUCTION
 *
 */
module.exports = env => {
  if (isDevelopment) {
    return merge(commonConfig, developmentConfig);
  } else {
    return merge(commonConfig, productionConfig);
  }
};
