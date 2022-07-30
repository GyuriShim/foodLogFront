import React,{useState, useEffect, useRef} from "react"
import styled from "styled-components"
import ImagePicker from "react-native-image-picker"
import { launchImageLibrary } from "react-native-image-picker"
import {Image, StatusBar, View, Text,  TouchableOpacity, Platform, Alert,Button, TextInput, useWindowDimensions} from "react-native"
import Pressable from "react-native/Libraries/Components/Pressable/Pressable"
import NativeImagePickerIOS from "react-native/Libraries/Image/NativeImagePickerIOS"
import {useRoute} from "@react-navigation/native"
//import onlaunchimagelibrary from "react-native-image-picker"

const Container = styled.View` 
  flex: 5
  color: white
`
const Box1 = styled.View`
  flex: 4
  background-color: white
  border: 2px solid black
`
const Box2 = styled.View`
  flex: 1
  background-color: white
  border: 2px solid black
`
const Box3 = styled.View`
  flex: 1
  background-color: white
  border: 2px solid black
`
const Box4 = styled.View`
  flex: 1
  background-color: white
`
const Box5= styled.View`
  flex: 3
  background-color: white
  border: 2px solid black
`
const ShowPicker = () => {
	//launchImageLibrary : 사용자 앨범 접근
	launchImageLibrary({}, (res)=>{
		alert(res.assets[0].uri)
		const formdata = new FormData()
		formdata.append("file", res.assets[0].uri)
		console.log(res)
	})
}

const UploadScreen = () => {
	return (
		<Container>
			<Box1>
				<Text>이미지</Text>
			</Box1>
			<TextInput
				style = {styled.input}
				multiline = {true}
				placeholder = "날짜 입력받기"
				textAlignVertical="top"
			/>
			<Box2 />
			<Box3/>
			<Box4/>
			<Box5/>
			<View style={{flex:0, padding:1}}>
				<Button title="이미지 업로드" onPress={ShowPicker}></Button>
			</View>
		</Container>

	)
}

const UploadImage = async() => {
	const image = {
		uri: "",
		type: "",
		name: "",
	}
	await launchImageLibrary({}, (res) => {
		if(res.didCancel){
			console.log("User cancelled image picker")
		}
		else if(res.errorCode){
			console.log("ImagePicker Error: ", res.errorCode)
		}
		else if(res.assets){ //정상적으로 사진을 반환 받았을 때
			console.log("ImagePicker res", res)
			image.name = res.assets[0].fileName
			image.type = res.assets[0].type
			image.uri = Platform.OS === "android" ? res.assets[0].uri : res.assets[0].uri.replace("file://", "")
		}
	})
	const formdata = new FormData()
	formdata.append("multipartFile", image)
	const headers = {
		"Content-Type" : "multipart/form-data; boundary=someArbitraryUniqueString",
	}
	console.log(image)
	console.log(formdata)

	axios.post("https://localhost:8080/post/new", formdata, {headers: headers})
		.then(response => {
			if(response){
        
				console.log(response.data)
			}
		})
		.catch((error)=> {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log(error.response.data)
				console.log(error.response.status)
				console.log(error.response.headers)
			} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js
				console.log(error.request)
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log("Error", error.message)
			}
		})
}
export default UploadScreen
