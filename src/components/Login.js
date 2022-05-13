import React from "react"
import {View, Image, StyleSheet, StatusBar} from "react-native"

const Login = () => {
	return(
		<>
			<StatusBar backgroundColor="#ffffff" barStyle="dark-content"/>
			<View style={styles.view}>
				<Image 
					source = {require("../assets/images/logo.png")}
					style={styles.image}
				/>
			</View>
		</>
	)}

const styles = StyleSheet.create({
	view:{
		flex: 1,
		backgroundColor: "#ffffff",
		alignItems: "center",
		justifyContent: "center",
		paddingBottom: 300
	},
	image: {
		height: 127,
		width: 202,
	}
})

export default Login