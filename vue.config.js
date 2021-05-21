module.exports = {
	pluginOptions: {
		electronBuilder: {
			nodeIntegration: true,
			builderOptions: {
				appId: "test.com",
				win: {
					icon: "public/icon.ico",
				},
			},
		},
	},
};
