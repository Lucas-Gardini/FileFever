class ExpressServer {
	constructor(port) {
		this.express = require("express");
		this.app = this.express();
		this.port = port;
		this.server = this.init();
	}

	init() {
		const fs = require("fs");
		const cors = require("cors");
		if (!fs.existsSync("./assets")) {
			fs.mkdirSync("./assets");
		}
		if (!fs.existsSync("./assets/upload/")) {
			fs.mkdirSync("./assets/upload/");
		}
		this.app.use(
			cors({
				allowedHeaders: "*",
			})
		);
		this.app.use(this.express.static("./assets/upload"));

		this.app.get("/files", (req, res) => {
			console.log(fs.readdirSync("./assets/upload"));
			res.json({ files: fs.readdirSync("./assets/upload") });
		});

		return this.app.listen(this.port, () => {
			console.log(`Server listening in: ${this.port}`);
		});
	}

	close() {
		try {
			this.server.close();
			return true;
		} catch (e) {
			return e;
		}
	}
}

module.exports = { ExpressServer };
