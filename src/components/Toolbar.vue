<template>
	<div class="ToolBar">
		<img src="../assets/logo.png" style="width: 27px; height: 25px" />
		<button @click="manageWindow('MINIMIZE')" class="tb-minimize">
			<i class="mdi mdi-minus"></i>
		</button>
		<button @click="manageWindow('MAXIMIZE')" class="tb-maximize">
			<i class="mdi mdi-square-outline"></i>
		</button>
		<button @click="manageWindow('CLOSE')" class="tb-close">
			<i class="mdi mdi mdi-close"></i>
		</button>
	</div>
</template>

<script>
const { BrowserWindow } = require("@electron/remote");
export default {
	methods: {
		manageWindow(method) {
			const window = BrowserWindow.getFocusedWindow();
			switch (method) {
				case "MINIMIZE":
					window.minimize();
					break;

				case "MAXIMIZE":
					window.isMaximized() ? window.unmaximize() : window.maximize();
					break;

				case "CLOSE":
					BrowserWindow.getAllWindows().forEach((window) => {
						window.close();
					});
					break;
			}
			BrowserWindow.getFocusedWindow();
		},
	},
};
</script>

<style>
.ToolBar {
	position: fixed;
	top: 0%;
	right: 0%;
	min-width: 100%;
	max-width: 100%;
	text-align: right;
	background-color: #202020;
	-webkit-app-region: drag;
	z-index: 9;
}

.ToolBar img {
	position: absolute;
	top: 0%;
	left: 0%;
}

.ToolBar button {
	background-color: none;
	border: 0px;
	background-color: #202020;
	color: white;
	-webkit-app-region: none !important;
	outline: none !important;
}

.ToolBar button.tb-minimize:hover {
	background-color: #303030;
}

.ToolBar button.tb-maximize:hover {
	background-color: #303030;
}

.ToolBar button.tb-close:hover {
	background-color: red;
}
</style>
