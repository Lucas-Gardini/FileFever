<template>
	<div id="nav">
		<Toolbar />
	</div>
	<router-view />
</template>

<script>
import Toolbar from "@/components/Toolbar.vue";
export default {
	components: {
		Toolbar,
	},
};
</script>

<style>
body {
	background-color: #181818;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	padding: 30px;
}

#nav a {
	font-weight: bold;
	color: #2c3e50;
}

#nav a.router-link-exact-active {
	color: #42b983;
}
</style>
