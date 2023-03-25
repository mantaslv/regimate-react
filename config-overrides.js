const webpack = require('webpack');

module.exports = function override(config, env) {
    config.resolve.alias = {
        ...config.resolve.alias,
        'process.env': JSON.stringify(process.env),
    };

    if (env === 'development') {
        config.plugins.push(new webpack.DefinePlugin({
            'process.env.REACT_APP_API_URL': JSON.stringify('http://localhost:4000')
        }));
    } else if (env === 'production') {
        config.plugins.push(new webpack.DefinePlugin({
            'process.env.REACT_APP_API_URL': JSON.stringify('https://regimate.onrender.com')
        }));
    }
    return config;
}