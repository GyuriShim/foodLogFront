import React,{useState, useEffect, useRef} from "react"
import styled from "styled-components"
import ImagePicker from "react-native-image-picker"
import { launchImageLibrary } from "react-native-image-picker"
import {Image, StatusBar, View, Text, StyleSheet, TouchableOpacity, Platform, Alert,Button, TextInput, useWindowDimensions} from "react-native"
import Pressable from "react-native/Libraries/Components/Pressable/Pressable"
import NativeImagePickerIOS from "react-native/Libraries/Image/NativeImagePickerIOS"
import ImagePick from "../components/ImagePick"
import {useRoute} from "@react-navigation/native"


/*const Container = styled.View`
    align-items: center
    background-color: white
	flex: 1
`
const StyledText = styled.Text`
    font-size: 30px
    margin-bottom: 10px
` */
const UploadScreen = () => {
	const route = useRoute()
	const {res} = route.params || {}
	const {width} = useWindowDimensions()

	return(
		<View style={styles.block}>
			<Image
				source={{uri: res.assets[0]?.uri}}
				style={[styles.image, {height: width}]}
				resizeMode="cover"
			/>
			<TextInput
				style={styles.input}
				multiline={true}
				placeholder="게시글을 입력하세요"
				textAlignVertical="top"
			/>
		</View>
	)
}
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
export default UploadScreen
