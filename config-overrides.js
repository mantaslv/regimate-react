/* eslint-disable @typescript-eslint/no-var-requires */
const { DefinePlugin } = require("webpack");

const override = (config, env) => {
	config.resolve.alias = {
		...config.resolve.alias,
		"process.env": JSON.stringify(process.env),
	};

	if (env === "development") {
		config.plugins.push(new DefinePlugin({
			"process.env.REACT_APP_API_URL": JSON.stringify("http://localhost:4000"),
		}));
	} else if (env === "production") {
		config.plugins.push(new DefinePlugin({
			"process.env.REACT_APP_API_URL": JSON.stringify("https://regimate.onrender.com"),
		}));
	}
	return config;
};

module.exports = override;