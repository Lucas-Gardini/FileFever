import { StatusBar } from "expo-status-bar";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const STORAGE_KEY = "@save_ip";

export default function App() {
	const [page, setPage] = useState("HOME");
	const [ip, setIp] = useState(async () => {
		try {
			const ip = await AsyncStorage.getItem(STORAGE_KEY);
			if (ip != null) {
				return ip;
			} else {
				return "";
			}
		} catch (e) {
			return "";
		}
	});
	const [filesComponents, setFilesComponents] = useState([]);

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			{page === "HOME" ? (
				<ScrollView style={styles.homePage}>
					<Button
						icon={<Icon name="file" size={15} color="white" />}
						iconLeft
						title=" Buscar Arquivos"
						onPress={async () => {
							console.log(`http://${ip._W}/files`);
							const fetchFiles = await (await fetch(`http://${ip._W}/files`)).json();
							setFilesComponents(fetchFiles.files);
						}}
					/>
					<View>
						{filesComponents.map((file, i) => {
							return (
								<View key={i}>
									<Button
										style={styles.downloadButton}
										icon={<Icon name="download" size={15} color="white" />}
										iconLeft
										title={file}
										onPress={() => {
											console.log(`http://${ip._W}/${file}`);
										}}
									/>
								</View>
							);
						})}
					</View>
				</ScrollView>
			) : (
				<ScrollView style={styles.configPage}>
					<Input
						placeholder="Endereço do Servidor, ex: 127.0.0.1:8080"
						value={ip._W}
						onChangeText={(value) => setIp(value)}
					/>
					<View style={styles.marginButton}>
						<Button
							icon={<Icon name="save" size={15} color="white" />}
							title=" Salvar"
							onPress={async () => {
								try {
									await AsyncStorage.setItem(STORAGE_KEY, ip);
									alert("Endereço Salvo!");
								} catch (e) {
									alert("Algo deu Errado!");
								}
							}}
						/>
					</View>
				</ScrollView>
			)}
			<View style={styles.floatingButton}>
				<Button
					buttonStyle={styles.floatingButtonBtn}
					icon={
						page === "HOME" ? (
							<Icon name="cog" size={15} color="white" />
						) : (
							<Icon name="arrow-left" size={15} color="white" />
						)
					}
					title={page === "HOME" ? " Configurar Servidor" : " Voltar"}
					onPress={() => {
						if (page === "HOME") {
							setPage("CONFIG");
						} else {
							setPage("HOME");
						}
					}}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	floatingButton: {
		position: "relative",
		display: "flex",
		marginBottom: 10,
	},
	floatingButtonBtn: {
		backgroundColor: "#00B74A",
	},
	homePage: {
		marginTop: 50,
	},
	configPage: {
		marginTop: 50,
		alignSelf: "stretch",
		textAlign: "center",
	},
	marginButton: {
		marginLeft: 20,
		marginRight: 20,
	},
	downloadButton: {
		marginTop: 10,
	},
});
