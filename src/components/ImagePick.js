import React,{useState} from "react"
import { Button } from "react-native"
import styled from "styled-components"
import ImagePicker from "react-native-image-picker"
import { launchImageLibrary } from "react-native-image-picker"
import {Image, StatusBar, View, Text, StyleSheet, TouchableOpacity, Platform, Alert} from "react-native"
import Pressable from "react-native/Libraries/Components/Pressable/Pressable"

function ImagePick(){
	//API에서 갤러리에서 이미지를 선택할 때 사용
	const imagePickerOption={
		mediaType: "photo",
		maxWidth:768,
		maxHeight: 768,
		includeBase64: Platform.OS === "android",
	}
	const onPickImage = (res) => {
		if (res.didCancel || !res){
			return
		}//선택사진정보
		console.log(res)
		//navigation.push("UploadScreen", {res})
	}
	const onlaunchimagelibrary = () => {//갤러리에서 사진선택
		launchImageLibrary(imagePickerOption, onPickImage)
	}
	const pluscircleo = () => {
		const options = {}
		ImagePicker.launchImageLibrary(options, response =>{
			console.log("response", response)
		})
	}
	return (
		onlaunchimagelibrary()
	)
}
	
//const result = await launchImageLibrary(options?)

export default ImagePick
