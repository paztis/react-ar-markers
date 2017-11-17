const PATH = require('path');
const PACKAGE = require('../package.json');

const ROOT = PATH.resolve(__dirname, '..');
const SRC = PATH.resolve(ROOT, 'src');
const SRC_FILE = PATH.resolve(SRC, 'index.tsx');
const DEMO_FILE = PATH.resolve(SRC, 'demo.tsx');
const DIST = PATH.resolve(ROOT, 'dist');
const BUILD = PATH.resolve(ROOT, 'build');
const BUILD_TSCONFIG = PATH.resolve(BUILD, 'webpack.tsconfig.json');

module.exports = ({ dev }) => {
    const RULES = [{
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
            configFile: BUILD_TSCONFIG
        }
    },
    // Binary loader for data
    {
        test: /\.dat$/,
        loaders: [
            'binary-loader',
        ],
        exclude: /node_modules/
    }];
    if (dev) {
        RULES.push({
            test: /\.ts$/,
            enforce: 'pre',
            loader: 'tslint-loader',
            options: {
                tsConfigFile: BUILD_TSCONFIG,
                // Autofix errors
                fix: false
            }
        })
    }

    return {
        devtool: (dev) ? 'inline-source-map' : 'source-map',
        entry: (dev) ? DEMO_FILE : SRC_FILE,
        output: {
            filename: `${PACKAGE.name}.js`,
            path: DIST,
            library: 'ReactArMarkers',
            libraryTarget: 'umd'
        },
        resolve: {
            // Add `.ts` and `.tsx` as a resolvable extension.
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: RULES
        },
        devServer: {
            open: true,
            contentBase: ROOT,
            publicPath: '/demo/',
            compress: true,
            port: 9000,
            overlay: {
                errors: true
              }
        }
    };
}