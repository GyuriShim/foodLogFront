import {GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-google-signin/google-signin"
import axios from "axios"
import React, { useContext, useEffect, useState} from "react"
import {View, Image, StyleSheet, StatusBar, Text, TouchableOpacity} from "react-native"
import UserContext from "../contexts/User"
import { clearAll, getItemFromAsync, setItemToAsync } from "../utils/StorageFun"
import PropTypes from "prop-types"

GoogleSignin.configure({
	webClientId : "177696185773-g2433eafo6etl3t3qhbrm7e77sd8i8d4.apps.googleusercontent.com",
	offlineAccess: true,
	forceCodeForRefreshToken: true
})


const Login = ({navigation}) => {
	const [loaded, setLoaded] = useState(false)
	const {dispatch} = useContext(UserContext)
	
	const signIn = async () => {
		try{
			await GoogleSignin.hasPlayServices()
			const userInfo = await GoogleSignin.signIn()
			const email = userInfo.user.email
			setLoaded(true)
			await axios({
				url : "http://10.0.2.2:8000/api/member/login",
				method: "post",
				data: {email: email},
			}).then ((response) => {
				if (response.status === 200) {
					//수정 및 테스트 필요
					console.log("res", response)
					setItemToAsync("AccessToken", response.data.accessToken)
					setItemToAsync("Member", response.data.member)
					setItemToAsync("Id", response.data.id)
					/* if(!response.data.member){
						
					}else{
					} */
					//navigation.navigate("AddInfo")
				}
			}).catch(function (error) {
				if (error.response) {
					// 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
					console.log("1", error.response.data)
					console.log("2", error.response.status)
					console.log("3", error.response.headers)
				}
				else if (error.request) {
					// 요청이 이루어 졌으나 응답을 받지 못했습니다.
					// `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
					// Node.js의 http.ClientRequest 인스턴스입니다.
					console.log("4", error.request)
				}
				else {
					// 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
					console.log("Error", error.message)
				}
				console.log("5", error.config)
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