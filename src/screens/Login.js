import {GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-google-signin/google-signin"
import axios from "axios"
import React, {Component} from "react"
import {View, Image, StyleSheet, StatusBar, Text, Linking} from "react-native"
import Loading from "./Loading"

GoogleSignin.configure({
	webClientId : "177696185773-g2433eafo6etl3t3qhbrm7e77sd8i8d4.apps.googleusercontent.com",
	offlineAccess: true,
	forceCodeForRefreshToken: true
})

class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userGoogleInfo: {},
			loaded: false
		}
	}

	signIn = async () => {
		try{
			await GoogleSignin.hasPlayServices()
			const userInfo = await GoogleSignin.signIn()
			this.setState({
				userGoogleInfo: userInfo,
				loaded: true
			})
			const email = this.state.userGoogleInfo.user.email
			console.log(userInfo)
			const response =  await axios({
				url : "http://10.0.2.2:8000/login",
				method: "post",
				data: {email: this.state.userGoogleInfo.user.email},
			})
			console.log("response", response)
		} 
		catch(error){
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
			  // user cancelled the login flow
			} else if (error.code === statusCodes.IN_PROGRESS) {
			  // operation (e.g. sign in) is in progress already
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
			  // play services not available or outdated
			} else {
			  // some other error happened
			  console.log(error)
			}
		}
	}

	
	
	render(){
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
						onPress={this.signIn}
						//http://10.0.2.2:8000/google/login")}
						//엑시오스로 데이터를 가져온다. 
						//겟매핑으로 데이터를 가져오기.
					/>
					{/* {this.state.loaded ? this.postData() : <Text>Not signedIn</Text>} */}
				</View>
			</>
		)
	}
}

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