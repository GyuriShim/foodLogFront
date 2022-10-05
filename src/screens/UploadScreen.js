import React,{useState, useEffect, useRef} from "react"
import { launchImageLibrary } from "react-native-image-picker"
import {ScrollView, Image, StatusBar, View, Text,  TouchableOpacity, Platform, TextInput, ActivityIndicator, StyleSheet, Alert} from "react-native"
import Pressable from "react-native/Libraries/Components/Pressable/Pressable"
import {useRoute} from "@react-navigation/native"
import axios from "axios"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import styled from "styled-components"
import Button from "../components/Button"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import RNPickerSelect from "react-native-picker-select"


const Container = styled.View` 
  flex: 1
  background-color: white //배경
`
const Box1 = styled.View`
  flex: 7
  margin: 3px 10px
  background-color: white
  border: 2px rgba(190, 235, 255, 0.4)
  align-items: center
`

const Box3 = styled.View`
  flex: 1
  border-radius: 7px
  margin: 3px 10px
  background-color: white
  border: 2px rgba(164, 212, 234, 0.8)
  `
const Box4 = styled.View`
  flex: 1
  margin: 3px 0px
  background-color: white
`
const Box5= styled.View`
  flex: 3
  border-radius: 7px
  margin: 5px 10px
  background-color: white
  border: 2px rgba(164, 212, 234, 0.8)
` 
const Box6 = styled.View`
  flex: 3
  border-radius: 7px
  padding: 8px
  margin: 5px 10px
  background-color: white
  border: 2px rgba(164, 212, 234, 0.8)
`
const styles = StyleSheet.create({
	customRatingBarStyle : {
		justifyContent: "center",
		flexDirection: "row",
		marginTop: 3,
	},
	starImgStyle : {
		padding: 15,
		width: 20,
		height: 30,
		resizeMode: "cover"
	},
	button: {
		width: "45%",
		height: 35,
		justifyContent: "center",
		marginHorizontal: 10,
		borderRadius: 7
	},
	spinner:{
		width: 80,
		height: 25,
		justifyContent: "center",
		marginHorizontal: 10,
		alignItems: "center"
	},
	label: {
		fontSize: 16,
		color: "black"
	},
	Box2:{
		flex:1,
		margin: 10,
		borderRadius: 7,
		borderWidth: 2,
		backgroundcolor: "white",
		borderColor: "#a4d3ea",
		flexDirection: "row",
		backgroundColor: "white",
		alignContent: "center",
		alignItems: "center",
	},
})
function UploadScreen({date, onChangeDate, navigation }){
	const [defaultRating, setdefaultRating] =useState(2)
	const [maxRating, setMaxRating] = useState([1,2,3,4,5])
	const [loading, setLoading] = useState(false)
	//const [date, setDate] = useState(log ? new Date(log.date) : new Date())
	const [mode, setMode] = useState("date")
	const [visible, setVisible] = useState(false)
	const [show, setShow] = useState(false)
	const [text, setText] = useState("Empty")
	const placeholder = "목적을 입력해주세요."
	const [response, setResponse] = useState(null)
	



	const onPressDate = () => {
		setMode("date")
		setVisible(true)
	}

	const onConfirm = (selectedDate) => {
		setVisible(false)
		onChangeDate(selectedDate)
		console.log(onChangeDate)
	}

	const onCancel = () => {
		setVisible(false)
	}

	const showMode = (currentMode) => {
		setShow(true)
		setMode(currentMode)
	} 
	const starImgFilled =  "https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png"
	const starImgCorner = "https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png"

	const CustomRatingBar = () => {
		return (
			<View style={styles.customRatingBarStyle}>
				{
					maxRating.map((item)=>{
						return (
							<TouchableOpacity
								activeOpacity={0.7}
								key= {item}
								onPress = {()=>setdefaultRating(item)}
							>
								<Image
									style={styles.starImgStyle} 
									source={
										item <= defaultRating
											? {uri: starImgFilled}
											: {uri: starImgCorner}
									}
								/>
							</TouchableOpacity>
						)						
					})
				}
			</View>
		)
	}
	
	const selectImage = async() => {
		launchImageLibrary(
			{
				mediaType: "photo",
				includeBase64: Platform.OS === "android",
			},
			(res) =>{
				setResponse(res)
			}
		)
	}

	/* 	const ShowPicker = async() => {

		//console.log(formdata)
		const img = {
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
				img.name = res.assets[0].fileName
				img.type = res.assets[0].type
				img.uri = Platform.OS === "android" ? res.assets[0].uri : res.assets[0].uri.replace("file://", "")
			}
		})
		const formdata = new FormData()
		formdata.append("multipartFile", img)
		//launchImageLibrary : 사용자 앨범 접근
		//alert(res.assets[0].uri)
		
		const headers = {
			"Content-Type" : "multipart/form-data; boundary=someArbitraryUniqueString",
		}
		console.log(img)
		console.log(formdata)
	
		axios.post("https://localhost:8080/post", formdata, {headers: headers})
			.then(response => {
				if(response){
        
					console.log(/* res.data response.data)
				}
			})
			.catch((error)=> {
				if (error.res) {
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
			})*/

	return (
		//<SafeAreaView>
		<KeyboardAwareScrollView contentContainerStyle={{flex:1}}>
			<Container >
				<ScrollView>
					<Box1>
						<View style={{flex:0, padding:1}}>
							<Button title="이미지 업로드" color={"lightblue"} onPress={selectImage}></Button>
							<Image 
								style={{width: 200, height:200, justifyContent: "center", alignItems: "center"}}
								source={{uri: response?.assets[0]?.uri}}
							/>
							{/* {image ?   // 이미지가 있으면 라이브러리에서 받아온 이미지로 출력, 없으면 디폴트 이미지 출력!
								<TouchableOpacity style={styles.imgWrapper} onPress={()=>pickImg()}>
									<Image source={{uri: image}} style={styles.imgStyle}/>
								</TouchableOpacity>  
								:
								<TouchableOpacity style={styles.imgWrapper} onPress={()=>pickImg()}>
									<Image source={image} style={styles.imgStyle}/>
								</TouchableOpacity>
							} */}
							{/* <Image style={{width: 200, height:200, justifyContent: "center", alignItems: "center"}}
								//source={{uri: "https://foodlogstorage.s3.ap-northeast-2.amazonaws.com/88ac415a-34df-44fa-bc1d-3bd5736710d7.jpeg"}}
								//style={styled.image}
								//source={{uri: ""}}
								resizeMode="cover"
							/> */}
						</View>
					</Box1>
					<View style = {styles.Box2}>
						<Text style={{flex: 1}}>{"날짜"}</Text>
						<TouchableOpacity style = {{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}} activeOpacity={0.5}>
							<Button title="등록" onPress={onPressDate}/>
						</TouchableOpacity>
						<DateTimePickerModal
							isVisible={visible}
							testID="dateTimePicker"
							value={date}
							mode={mode}
							onConfirm={onConfirm}
							onCancel={onCancel}
							is24Hour={true}
							display= "default"
							date={date}
						/>
					</View>
					<Box3>
						<TextInput
							style = {styled.input}
							multiline = {true}
							placeholder = "상호명"
							textAlignVertical="center"
						/>
					</Box3>
					<Box4>
						<CustomRatingBar/>
					</Box4>
					<Box5>
						<TextInput
							style = {styled.input}
							multiline = {true}
							placeholder = "내용을 입력하세요"
							textAlignVertical="center"
						/>
					</Box5>
					<Box6>
						<View>
							<Text>목적</Text>
							<RNPickerSelect
								textInputProps={{ underlineColorAndroid: "transparent"}}
								placeholder={{
									label: placeholder,
								}}
								fixAndroidTouchableBug={true}//안드로이드에서 클릭을 여러번해야 picker가 나오는 경우가 있어 추가를 하였습니다. true로 설정하면 이런 에러가 사라집니다.
								value={text}
								onValueChange={(value) => console.log(value)}
								useNativeAndroidPickerStyle={false}
								items={[
									{ label: "친구", value: "" },
									{ label: "혼밥", value: "" },
									{ label: "가족", value: "" },
									{ label: "회식", value: "" },
									{ label: "데이트", value: "" },
									{ label: "기타", value: "" },
								]}
							/> 
						</View>
					</Box6>
				</ScrollView>
				<View style={{flexDirection: "row", justifyContent: "space-evenly", paddingTop:"5%"}}>
					<Button title="취소" color={"rgba(165, 212, 233, 0.5)"} containerStyle={styles.button} onPress={() => navigation.goBack()} />
					{loading ? (
						<ActivityIndicator style={styles.spinner} />
					) :  (
						<Button title="다음" color={"rgba(165, 212, 233, 0.5)"} containerStyle={styles.button} onPress={() => navigation.navigate("PostScreen")}/>
					)}
				</View>
			</Container> 
		</KeyboardAwareScrollView>
		//</SafeAreaView>
	)
}

export default UploadScreen
