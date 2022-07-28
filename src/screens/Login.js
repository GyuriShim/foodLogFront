import {GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-google-signin/google-signin"
import axios from "axios"
import React, {Component} from "react"
import {View, Image, StyleSheet, StatusBar, Text} from "react-native"
import { setItemToAsync } from "../utils/StorageFun"

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
			const response =  await axios({
				url : "http://10.0.2.2:8000/api/member/login",
				method: "post",
				data: {email: this.state.userGoogleInfo.user.email},
			}).then ((response) => {
				if (response.status === 200) {
					setItemToAsync("AccessToken", response.data.accessToken)
				}  
			}).catch(function (error) {
				if (error.response) {
					// 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				}
				else if (error.request) {
					// 요청이 이루어 졌으나 응답을 받지 못했습니다.
					// `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
					// Node.js의 http.ClientRequest 인스턴스입니다.
					console.log(error.request);
				}
				else {
					// 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
					console.log('Error', error.message);
				}
				console.log(error.config);
			})
		}catch(error){
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
		width: 230, 
		height: 48 
	}
	
})


export default Login