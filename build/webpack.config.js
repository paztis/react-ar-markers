const PATH = require('path');
const PACKAGE = require('../package.json');

const ROOT = PATH.resolve(__dirname, '..');
const SRC = PATH.resolve(ROOT, 'src');
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
        entry: SRC,
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
        }
    };
}