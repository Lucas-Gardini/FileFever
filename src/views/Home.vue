<template>
	<div class="home">
		<img src="../assets/logo-full.png" />
		<MDBModal tabindex="-1" v-model="uploading_files" centered>
			<MDBModalHeader>
				<MDBModalTitle> Adicionar arquivos </MDBModalTitle>
			</MDBModalHeader>
			<MDBModalBody>
				<p>
					<MDBFile v-model="uploaded_files" multiple label="Selecione os arquivos" />
				</p>
			</MDBModalBody>
			<MDBModalFooter>
				<MDBBtn
					color="secondary"
					@click="(uploading_files = false), (uploading_files = null)"
				>
					Fechar
				</MDBBtn>
				<MDBBtn color="success" @click="saveFiles()"> Salvar </MDBBtn>
			</MDBModalFooter>
		</MDBModal>
		<MDBContainer class="bg-light">
			<div v-for="(file, i) of files" :key="i">
				<MDBRow style="place-items: center">
					<MDBCol
						md="10"
						style="vertical-align: middle"
						class="border-bottom border-success rounded-pill"
					>
						<p style="margin: auto"><i class="mdi mdi-file"></i>&nbsp; {{ file }}</p>
					</MDBCol>
					<!-- <MDBCol md="6">{{ file.path }}</MDBCol> -->
					<MDBCol md="auto"
						><MDBBtn
							@click="deleteFile(i)"
							color="danger"
							floating
							style="font-size: large"
						>
							<i class="mdi mdi-delete-forever"></i></MDBBtn
					></MDBCol>
				</MDBRow>
			</div>
			<MDBBtn @click="uploading_files = !uploading_files" color="success"
				><i class="mdi mdi-upload"></i> Enviar</MDBBtn
			>
			<MDBBtn
				style="position: fixed; bottom: 0%; right: 0%; font-size: large; z-index: 9;"
				:class="clicked"
				color="success"
				floating
				@click="clicked === 'clicked' ? (clicked = 'notClicked') : (clicked = 'clicked')"
			>
				<i class="mdi mdi-cog"></i>
			</MDBBtn>
		</MDBContainer>
		<MDBContainer id="configScreen" :class="clicked === 'clicked' ? 'show' : 'hide'"
			><MDBNavbar
				style="position: absolute; top: 0%; margin-top: 30px; width: 100vw"
				expand="lg"
				dark
				bg="success"
				container
			>
				<MDBNavbarNav center class="mb-2 mb-lg-0">
					<MDBNavbarItem :class="isAtConfigurations ? 'active' : ''">
						<a @click="isAtConfigurations = true" href="javascript:void(0)"
							>Configurações</a
						>
					</MDBNavbarItem>
					<MDBNavbarItem :class="isAtConfigurations ? '' : 'active'">
						<a @click="isAtConfigurations = false" href="javascript:void(0)">Ajuda</a>
					</MDBNavbarItem>
				</MDBNavbarNav>
			</MDBNavbar>
			<MDBContainer>
				<MDBRow>
					<MDBCol md="6" style="margin-top: 20px !important">
						<MDBInput white label="Porta do Servidor" v-model="port" />
						<MDBBtn @click="saveConfiguration()" color="success"
							><i class="mdi mdi-content-save-move"></i> Salvar e Reiniciar
							Servidor</MDBBtn
						>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		</MDBContainer>
	</div>
</template>

<script>
import {
	MDBContainer,
	MDBBtn,
	MDBRow,
	MDBCol,
	MDBModal,
	MDBModalHeader,
	MDBModalTitle,
	MDBModalBody,
	MDBModalFooter,
	MDBFile,
	MDBInput,
	MDBNavbar,
	MDBNavbarNav,
	MDBNavbarItem,
} from "mdb-vue-ui-kit";
import fs from "fs";
import { ExpressServer } from "../assets/express.js";

export default {
	name: "Home",
	components: {
		MDBContainer,
		MDBBtn,
		MDBRow,
		MDBCol,
		MDBModal,
		MDBModalHeader,
		MDBModalTitle,
		MDBModalBody,
		MDBModalFooter,
		MDBFile,
		MDBInput,
		MDBNavbar,
		MDBNavbarNav,
		MDBNavbarItem,
	},
	async mounted() {
		await this.start();
	},
	data() {
		return {
			port: localStorage.serverPort || 7769,
			files: null,
			uploaded_files: null,
			uploading_files: false,
			server: null,
			clicked: "notClicked",
			isAtConfigurations: true,
		};
	},
	methods: {
		async saveConfiguration() {
			localStorage.serverPort = this.port;
			if (await this.server.close()) {
				await this.start();
			}
		},
		saveFiles() {
			try {
				for (let file of this.uploaded_files) {
					fs.copyFileSync(file.path, `./assets/upload/${file.name}`);
				}
				this.files = fs.readdirSync("./assets/upload");
				this.uploading_files = false;
			} catch (e) {
				console.log(e);
			}
		},
		deleteFile(file_index) {
			try {
				fs.unlinkSync(`./assets/upload/${this.files[file_index]}`);
				this.files = fs.readdirSync("./assets/upload");
			} catch (e) {
				console.log(e);
			}
		},
		async start() {
			if (!fs.existsSync("./assets")) {
				fs.mkdirSync("./assets");
			}
			if (!fs.existsSync("./assets/upload/")) {
				fs.mkdirSync("./assets/upload/");
			}
			this.files = fs.readdirSync("./assets/upload");
			this.server = await new ExpressServer(this.port);
		},
	},
};
</script>

<style>
.container button {
	margin: 20px;
}

.clicked {
	transition: 1s;
	transform: rotate(360deg);
}

.notClicked {
	transition: 1s;
	transform: rotate(0deg);
}

.container#configScreen {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	min-width: 100vw;
	min-height: 100vh;
	background-color: #262626;
	color: #fbfbfb;
	display: grid;
	place-items: center;
}

.container.show {
	transition: all 0.5s;
	transform: scale(1) translate(-50%, -50%) !important;
}

.container.hide {
	transition: all 0.5s;
	transform: scale(0) translate(-50%, -50%) !important;
}

/* 
ul {
	list-style-type: none;
	margin: 0;
	text-align: center;
	margin-top: 10%;
}
ul li {
	display: inline-block;
	margin: 0 20px;
} */

ul li:nth-child(1) {
	margin-right: 20px;
}

ul li:nth-child(2) {
	margin-left: 20px;
}

.active a {
	color: #fbfbfb !important;
}

a {
	font-size: 20px;
	color: #262626;
	position: relative;
	text-transform: uppercase;
	text-decoration: none;
	padding-bottom: 8px;
}

a:hover {
	color: #fbfbfb;
}

a:before,
a:after {
	content: "";
	position: absolute;
	bottom: 2px;
	left: 0;
	right: 0;
	height: 2px;
	background-color: #262626;
}
a:before {
	opacity: 0;
	transform: translateY(-8px);
	transition: transform 0s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0s;
}
a:after {
	opacity: 0;
	transform: translateY(4px);
	transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.2s;
}
a:hover:before,
a:hover:after {
	opacity: 1;
	transform: translateY(0);
}
a:hover:before {
	transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.2s;
}
a:hover:after {
	transition: transform 0s 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0s 0.2s;
}
</style>
