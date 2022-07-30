import React, {useState, useEffect, useRef} from "react"
import {View, Pressable, StyleSheet, Platform, Alert, Text, Button, Image, TextInput,useWindowDimensions} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { AntIcon } from "../assets/icons/AntIcon"
import MainTab from "../navigations/MainTab"
import UploadScreen from "../screens/UploadScreen"
import ImagePicker from "react-native-image-picker"
import { launchImageLibrary } from "react-native-image-picker"
import styled from "styled-components"
import axios from "axios"
import StarRating from "./StarRating"
//import { TextInput } from "react-native-gesture-handler"
//const URL="https://localhost:8080/post/new"
/*const options = {  
	title: "Select Image",
	type: "library",
	options: {
		maxHeight: 200,
		maxWidth: 200,
		selectionLimit: 1,
		mediaType: "photo",
		includeBase64: Platform.OS === "android"
	},
}
const UploadButton = () => {
	//const insets = useSafeAreaInsets()
	const onLaunchImageLibrary = () => {
		launchImageLibrary(options, openGallery)
	}
	const openGallery = async() =>{
		const images = await launchImageLibrary(options)
		console.log(images.assets[0])
		const formdata = new FormData()
		formdata.append("file",{
			uri: images.assets[0].uri,
			type:images.assets[0].type,
			name: images.assets[0].fileName 
		})
		let res = await fetch(
			URL,
			{
				method: "post",
				body: formdata,
				headers: {
					"Content-type": "multipart/form-data",
				},
			}
		)
		let responseJson = await res.json()
		console.log(responseJson,"responseJson")
	} 

	/*  	
	return(
		<View style={styles.block}>
			<Image
				source={{uri}}
				style={[styles.image, {height: maxWidth}]}
				resizeMode="cover"/>
			<TextInput
				style={styles.input}
				multiline={true}
				placeholder="게시글을 입력하세요"
				textAlignVertical="top"
			/>
		</View>
		
	)
    
	const styles = StyleSheet.create({
		block: {
			flex: 1
		},
		image: {width: "100%"},
		input: {
			paddingHorizontal: 16,
			paddingTop: 16,
			paddingBottom: 16,
			flex: 1,
			fontSize: 16,
		},
	})
} */

//export default UploadButton