import React,{useState} from "react"
import { Button } from "react-native"
import styled from "styled-components"
import ImagePicker from "react-native-image-picker"
import { launchImageLibrary } from "react-native-image-picker"
import {Image, StatusBar, View, Text, StyleSheet, TouchableOpacity, Platform, Alert} from "react-native"
import Pressable from "react-native/Libraries/Components/Pressable/Pressable"
import NativeImagePickerIOS from "react-native/Libraries/Image/NativeImagePickerIOS"
import ImagePick from "../components/ImagePick"

const Container = styled.View`
    align-items: center
    background-color: white
	flex: 1
`
const StyledText = styled.Text`
    font-size: 30px
    margin-bottom: 10px
` 
const UploadScreen = () => {
	return(
		<ImagePick/>
	)
}
export default UploadScreen
