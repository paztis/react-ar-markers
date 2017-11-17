const PATH = require('path');
const WEBPACK = require('webpack');
const PACKAGE = require('../package.json');

const ROOT = PATH.resolve(__dirname, '..');
const SRC = PATH.resolve(ROOT, 'src');
const SRC_FILE = PATH.resolve(SRC, 'index.js');
const DEMO_FILE = PATH.resolve(SRC, 'demo.js');
const DIST = PATH.resolve(ROOT, 'dist');
const BUILD = PATH.resolve(ROOT, 'build');

const ENV_MODES = {
    DEV: 'development',
    PROD: 'production'
};

module.exports = ({NODE_ENV = ENV_MODES.PROD}) => {
    // ------ ENTRY ------
    const ENTRY = {};
    ENTRY[PACKAGE.name] = (NODE_ENV === ENV_MODES.DEV) ? DEMO_FILE : SRC_FILE;


    // ------ EXTERNALS ------
    const EXTERNALS = {};
    if (NODE_ENV === ENV_MODES.PROD) {
        EXTERNALS.react = {root: 'React', commonjs2: 'react', commonjs: 'react', amd: 'react'};
        EXTERNALS['react-dom'] = {root: 'ReactDOM', commonjs2: 'react-dom', commonjs: 'react-dom', amd: 'react-dom'};
    }

    // ------ RULES LIST ------
    const RULES = [
        // Babel loader for js files
        {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                // BABEL_ENV set to es5
                forceEnv: 'es5',
                compact: false,
                cacheDirectory: true
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

    // only add eslint for dev mode
    if (NODE_ENV === ENV_MODES.DEV) {
        RULES.push({
            test: /\.js$/,
            enforce: 'pre',
            include: [SRC],
            loader: 'eslint-loader',
            options: {
                failOnWarning: false,
                failOnError: false
            }
        });
    }

    // ------ PLUGINS LIST ------
    const PLUGINS = [
        new WEBPACK.NoEmitOnErrorsPlugin(),
        new WEBPACK.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(NODE_ENV)
            }
        })
    ];

    return {
        devtool: (NODE_ENV === ENV_MODES.DEV) ? 'inline-source-map' : 'source-map',
        entry: ENTRY,
        output: {
            filename: `${PACKAGE.name}.js`,
            path: DIST,
            library: 'ReactArMarkers',
            libraryTarget: 'umd'
        },
        externals: EXTERNALS,
        resolve: {
            extensions: ['.js', '.json', '.jsx']
        },
        module: {
            rules: RULES
        },
        plugins: PLUGINS,
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
};
