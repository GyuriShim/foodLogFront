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
import { createPostApi } from "../service/post"

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
function UploadScreen({onChangeDate, navigation }){
	const [defaultRating, setdefaultRating] =useState(2)
	const [maxRating, setMaxRating] = useState([1,2,3,4,5])
	const [loading, setLoading] = useState(false)
	//const [date, setDate] = useState( log ? new Date(log.date) : new Date())
	const [mode, setMode] = useState("date")
	const [visible, setVisible] = useState(false)
	const [show, setShow] = useState(false)
	const [text, setText] = useState("Empty")
	const placeholder = "목적을 입력해주세요."
	const [response, setResponse] = useState(null)
	
	const [review, setReview] = useState()
	const [rating, setRating] = useState()
	const [purpose, setPurpose] = useState()

	const formdata = new FormData() //지원
	const formData = new FormData()

	const onPressDate = () => {
		setMode("date")
		setVisible(true)
	}

	const onConfirm = (selectedDate) => {
		setVisible(true)
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

	const createPost = async (review, rating, purpose) => {
		const newPost = {
			memberId: 40,
			review: review,
			rating: rating,
			purpose: purpose,
			date: "2020-10-10",
			place: {
				kakaoId : "1110210115",
				name : "빨강파이프",
				address : "경기 용인시 수지구 죽전로144번길 7-5",
			},
			category: "분식",
			longitude: "127.124165839734",
			latitude: "37.3235861851341"
		}

		const imageFile = {
			name: "rn_image_picker_lib_temp_9b40ac5b-b785-4289-8a4a-2fd53aca9b52.jpg", 
			type: "image/jpeg", 
			uri: "file:///data/user/0/com.foodlog/cache/rn_image_picker_lib_temp_9b40ac5b-b785-4289-8a4a-2fd53aca9b52.jpg"
		}
		
		
		//formData.append('post', new Blob([JSON.stringify(newPost)], {type: "application/json"}))
		formData.append('post', JSON.stringify(newPost), {type: "application/json;"})
		formData.append('file', imageFile)
				
		const headers = {
			"Content-Type" : "multipart/form-data; boundary=someArbitraryUniqueString",
			"access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzMjE4MDg0NkBkYW5rb29rLmFjLmtyIiwiaXNzIjoiZm9vZCBsb2ciLCJtZW1iZXJJZCI6NDAsImlhdCI6MTY2NTQ3MDEwMiwiZXhwIjoxNjY1NDgwOTAyfQ.CFcAEjPsmRCqvfB3X4TbdQDuxqGx5Y9-fvQ6n1RCzD0aLChfkwCvlESDa_LtaipZDBPCCx61Mp5ZyVWZ6TlDdQ"
		}

		console.log(formData)

		await axios.post("http://food-log-dku.com:8080/api/v1/post",formData, {headers})
			.then(response => {
				if(response){
					console.log(response)
					console.log("create post success")
				}
			})
			.catch((error)=> {
				if (error.res) {
					console.log("error1", error.response.data)
					console.log("error2", error.response.status)
					console.log("error3", error.response.headers)
				} else if (error.request) {
					console.log("error4", error.request)
					console.log("error5", error.message)
				} else {
					console.log("error6", error.message)
				}
			})
			
			/*
			await axios.post("http://food-log-dku.com:8080/api/v1/post", formData, {
				headers: {
				  'Content-Type': 'multipart/form-data',
				  'ACCESS-TOKEN': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzMjE4MDg0NkBkYW5rb29rLmFjLmtyIiwiaXNzIjoiZm9vZCBsb2ciLCJtZW1iZXJJZCI6NDAsImlhdCI6MTY2NTQ2Njg4MiwiZXhwIjoxNjY1NDc3NjgyfQ.q6AHcVmnCioQvJU99NUM8aBkzl9oMBosXZ4EwnmPePHEGw1XyF7uuIC_MlrNgAaWA-GL6B02imd4TX115JyNZg'
				},
				transformRequest: (data, headers) => {
				  return data;
				},
			  }).then(response => {
				if(response){
					console.log(response)
					console.log("create post success")
				}
			})
			.catch((error)=> {
				if (error.res) {
					console.log("error1", error.response.data)
					console.log("error2", error.response.status)
					console.log("error3", error.response.headers)
				} else if (error.request) {
					console.log("error4", error.request)
					console.log("error5", error.message)
				} else {
					console.log("error6", error.message)
				}
			});*/


			

			
		
	}
	const CustomRatingBar = () => {
		return (
			<View style={styles.customRatingBarStyle}>
				{
					maxRating.map((item)=>{
						return (
							<TouchableOpacity
								activeOpacity={0.7}
								key= {item}
								onPress = {()=>{setdefaultRating(item),
									setRating(item)
									console.log(rating)
								}}
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
		const image = {
			uri: "",
			type: "",
			name: "",
			timestamp:"",
		}
		await launchImageLibrary(
			{
				mediaType: "photo",
				includeBase64: Platform.OS === "android",
			},
			(res) =>{
				setResponse(res)
				if(res.didCancel){
					console.log("User cancelled image picker")
				}
				else if(res.errorCode){
					console.log("ImagePicker Error: ", res.errorCode)
				}
				else if(res.assets){ //정상적으로 사진을 반환 받았을 때
					
					image.name = res.assets[0].fileName
					image.type = res.assets[0].type
					image.uri = Platform.OS === "android" ? res.assets[0].uri : res.assets[0].uri.replace("file://", "")
					image.timestamp = res.assets[0].timestamp
					//console.log(image.timestamp)
				}
				
			}
		)
		const formData = new FormData()
		formData.append("multipartFile", image)
		//alert(res.assets[0].uri)
		const headers = {
			"Content-Type" : "multipart/form-data; boundary=someArbitraryUniqueString",
		}
		console.log(image)
		console.log(formData)

		axios.post("https://localhost:8080/post", formData, {headers: headers})
			.then(response => {
				if(response){
					console.log("rrrr", response.data)
				}
			})
			.catch((error)=> {
				if (error.res) {
					console.log("errormessage", error)
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
	}
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
								resizeMode="cover"
							/>
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
							//value={date}
							mode={mode}
							onConfirm={onConfirm}
							onCancel={onCancel}
							is24Hour={true}
							display= "default"
							//date={date}
						/>
					</View>
					<Box3>
						<TextInput
							style = {styled.input}
							multiline = {true}
							placeholder = "상호명"
							textAlignVertical="center"
						>

						</TextInput>
					</Box3>
					<Box4>
						<CustomRatingBar
							/>
					</Box4>
					<Box5>
						<TextInput
							style = {styled.input}
							multiline = {true}
							placeholder = "내용을 입력하세요"
							textAlignVertical="center"
							value={review}
							onChangeText={ text => setReview(text)}
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
								onValueChange={(value) => {console.log(value), setPurpose(value)}}
								useNativeAndroidPickerStyle={false}
								items={[
									{ label: "친구", value: "FRIEND" },
									{ label: "혼밥", value: "SOLO" },
									{ label: "가족", value: "FAMILY" },
									{ label: "회식", value: "MEETING" },
									{ label: "데이트", value: "COUPLE" },
									{ label: "기타", value: "ETC" },
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
						<form onSubmit= {selectImage} entype="multipart/form-data">
							<input type="file"/>
							<Button type="submit" title="다음" color={"rgba(165, 212, 233, 0.5)"} containerStyle={styles.button} onPress={() => navigation.navigate("PostScreen")}/>
						</form>)
					}
					
				</View>
			</Container> 
		</KeyboardAwareScrollView>
		//</SafeAreaView>
	)
}

export default UploadScreen
