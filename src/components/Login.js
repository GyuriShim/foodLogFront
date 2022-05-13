import { GoogleSigninButton } from "@react-native-google-signin/google-signin"
import React from "react"
import {View, Image, StyleSheet, StatusBar, Text} from "react-native"

const Login = () => {
	return(
		<>
			<StatusBar backgroundColor="#ffffff" barStyle="dark-content"/>

			
			<View style={styles.view1}>
				<Image 
					source = {require("../assets/images/logo.png")}
					style={styles.image}
				/>
			</View>
			<View style={styles.view2}>
				<Text style= {styles.text}>LOGIN</Text>
			</View>
			<View style={{flex:1, backgroundColor:"#ffffff", alignItems:"center", paddingTop:30}}>
				<GoogleSigninButton 
					style={styles.googleButton}
					size={GoogleSigninButton.Size.Wide}
					color={GoogleSigninButton.Color.Light}
					/*onPress={this._signIn}
					disabled={this.state.isSigninInProgress}
					로그인화면 파란색으로 변경*/
				/>
			</View>
		</>
	)}

const styles = StyleSheet.create({
	view1:{
		flex: 0,
		backgroundColor: "#ffffff",
		alignItems: "flex-start",
		justifyContent: "center",
		paddingLeft:30,
		paddingTop: 50
	},
	view2:{
		flex: 0,
		backgroundColor: "#ffffff",
		alignItems: "flex-start",
		justifyContent: "center",
		paddingLeft:30,
		paddingTop: 50
	},
	image: {
		height: 82,
		width: 130,
	},
	text: {
		fontSize: 24,
		color: "#2F5D9A",
		fontFamily: "Multicolore Pro",
		
	},
	googleButton: {
		width: 192, 
		height: 48 
	}
	
})


export default Login