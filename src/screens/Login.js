import {GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-google-signin/google-signin"
import React, { useContext, useEffect, useState} from "react"
import {View, Image, StyleSheet, StatusBar, Text, TouchableOpacity} from "react-native"
import UserContext from "../contexts/User"
import { clearAll, getItemFromAsync, setItemToAsync } from "../utils/StorageFun"
import PropTypes from "prop-types"
import { login } from "../service/login"

GoogleSignin.configure({
	webClientId : "177696185773-g2433eafo6etl3t3qhbrm7e77sd8i8d4.apps.googleusercontent.com",
	offlineAccess: true,
	forceCodeForRefreshToken: true
})
// member 로그인하면 -> dispatch(true);

const Login = ({navigation}) => {
	const [loaded, setLoaded] = useState(false)
	const {dispatch} = useContext(UserContext)
	const googleLogin = (email) => {
		console.log(email)
		login(email)
			.then((res) => {
				if (res.status === 200) {
					console.log(res.data.member)
					setItemToAsync("AccessToken", res.data.accessToken)
					setItemToAsync("Email", res.data.email)
					setItemToAsync("Id", res.data.id)
					if (res.data.member==false) {
						navigation.navigate("AddInfo")
					} else {
						dispatch(true)
					}
				}
			})
			.catch((error) => {
				console.log("login error", error)
			})
	}
	
	const signIn = async () => {
		try{
			await GoogleSignin.hasPlayServices()
			const userInfo = await GoogleSignin.signIn()
			const email = userInfo.user.email
			setLoaded(true)
			googleLogin(email)
		} catch(error){
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
				// user cancelled the login flow
			} else if (error.code === statusCodes.IN_PROGRESS) {
				// operation (e.g. sign in) is in progress already
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
				// play services not available or outdated
			} else {
				// some other error happened
				console.log("6", error)
			}
		}
	}

	

	/* 	const isSignIn = async() => {
		if (loaded === true) {
			async() => {
				try {
					const id = getItemFromAsync("Id")
					await axios({
						url: `http://10.0.2.2:8000/api/member/profile/${id}`,
						method: "GET"
					}).then((response) =>{
						console.log(response.data.memberId)
						if (response.data.memberId === null) {
							return false
						} else {
							return true
						}
					})
				} catch (error) {
					console.log(error)
				}
			}
		}
	} 
 */
	
	
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
					onPress={signIn}
				/>
				<TouchableOpacity style={{width: 20, height: 20, backgroundColor: "black"}} onPress={clearAll}></TouchableOpacity>
			</View>
		</>
	)
	
}

Login.propTypes = {
	navigation : PropTypes.shape({
		navigate : PropTypes.func.isRequired,
	}).isRequired
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