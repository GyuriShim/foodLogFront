import React,{useState, useEffect, useRef, useContext} from "react"
import { launchImageLibrary } from "react-native-image-picker"
import {ScrollView, Image, StatusBar, View, Text,  TouchableOpacity, Platform, TextInput, ActivityIndicator, StyleSheet, useWindowDimensions, FlatList} from "react-native"
import axios from "axios"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import styled from "styled-components"
import Button from "../components/Button"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { Picker } from "@react-native-picker/picker"
import ImagePicker from "react-native-image-picker"
import { createPost } from "../service/post"
import UserIdContext from "../contexts/UserId"
import PlaceInfoContext from "../contexts/Place"
import { ProgressContext } from "../contexts/Progress"

const Container = styled.View` 
  flex: 1
  background-color: white //배경
`
const Box1 = styled.View`
  flex: 7
  margin: 3px 10px
  background-color: white
  align-items: center
`

const Box3 = styled.View`
  flex: 1
  padding : 20px
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
		paddingLeft: 10,
	},
})
function UploadScreen({onChangeDate, navigation, route }){
	const [defaultRating, setdefaultRating] =useState(0)
	const [maxRating, setMaxRating] = useState([1,2,3,4,5])
	const [loading, setLoading] = useState(false)
	const [date, setDate] = useState("")
	//const [mode, setMode] = useState("date")
	const [visible, setVisible] = useState(false)
	const [show, setShow] = useState(false)
	const [text, setText] = useState("Empty")
	const placeholder = "목적을 입력해주세요."
	const [response, setResponse] = useState(null)
	const [image, setImage] = useState("")
	
	const [review, setReview] = useState()
	const [rating, setRating] = useState()
	const [purpose, setPurpose] = useState("SOLO")
	const [postId, setPostId] = useState()
	//const [place, setPlace] = useState()
	const {placeInfo, setPlaceInfo} = useContext(PlaceInfoContext)
	const {userId} = useContext(UserIdContext)
	const {spinner} = useContext(ProgressContext)
	const {width} = useWindowDimensions()

	const starImgFilled =  "https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png"
	const starImgCorner = "https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png"

	const place = route.params
	const showDatePicker = () => {
		setVisible(!visible)
	}
	const hideDatePicker = () => {
		setVisible(!visible)
	}
	const handleConfirm = (date) => {
		console.log(date)
		var splitDate = date.toISOString().split("T")
		console.log(splitDate)
		setDate(splitDate[0])
		hideDatePicker()
	}

	const createPostAxios = async (review, rating, purpose, place) => {
		const formData = new FormData()
		const category = place.category_name.split(">")

		const category = place.category_name.split(">")

		const newPost = {
			memberId: userId,
			review: review,
			rating: rating,
			purpose: purpose,
			date: date,
			place: {
				kakaoId : place.id,
				name : place.place_name,
				address: place.road_address_name,
				category: category[1].trim(),
				longitude: place.x,
				latitude: place.y
			},
		}

		formData.append("post", encodeURIComponent(JSON.stringify(newPost)))

		image.forEach(img => {
			formData.append("file", img)
		})
		
		try{
			spinner.start()
			console.log(newPost.place.category)
			await createPost(formData)
				.then(response => {
					if(response){
						console.log("response : ", response.data)
						console.log("create post success")
						let postId = response.data.postId
						//setPostId(response.data.postId)
						navigation.navigate("PostScreen", {postId: postId})
					}
				})
				.catch((error)=> {
					console.log("error : ", error)
				})
		}catch(error){
			console.log("error", error)
		}finally{
			spinner.stop()
		}
		
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
								console.log(purpose)
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
		await launchImageLibrary(
			{
				mediaType: "photo",
				includeBase64: Platform.OS === "android",
				includeExtra: true,
				selectionLimit: 5,
			},
			(response) => {
				if(response.didCancel){
					return
				}
				const imageFiles = []
				
				setResponse(response)
				response.assets.forEach(asset => {
					const imageFile = {
						uri: asset.uri,
						type: asset.type,
						name: asset.fileName,
					}
					imageFiles.push(imageFile)
				})

				setImage(imageFiles)

				if(response?.assets[0]?.timestamp !== null){
					var originDate = response?.assets[0]?.timestamp.split("T")
					setDate(originDate[0])	
				}
				
			}

		)
	}
	const FlatlistImage = ({item: {uri}}) => {
		return (
			<Image
				style={{width: width*0.9, height:width*0.9, justifyContent: "center", alignItems: "center", paddingRight: 5}}
				source={{uri: uri}}
				resizeMode="cover"
			/>

		)
	}
	
	return (
		<KeyboardAwareScrollView contentContainerStyle={{flex:1, backgroundColor:"white"}}>
			<Container >
				<ScrollView>
					<Box1>
						<View style={{ alignItems: "center", flex: 1, height: width*0.9}}>
							<FlatList
								data={response?.assets}
								horizontal={true}
								renderItem = {({item,index}) => (<FlatlistImage item={item}/>)}
							/>
						</View>
						<View style={{flex:0, paddingTop:5}}>
							<Button title="이미지 업로드" color={"lightblue"} onPress={selectImage}></Button>
						</View>
					</Box1>
					<View style = {styles.Box2}>
						{date ? 
							<Text style={{flex: 1}}>{date}</Text> :
							<Text style={{flex: 1}}>날짜</Text>}
						<TouchableOpacity style = {{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}} activeOpacity={0.5}>
							<Button title="등록" onPress={showDatePicker}/>
						</TouchableOpacity>
						<DateTimePickerModal
							isVisible={visible}
							testID="dateTimePicker"
							value={date}
							mode={"date"}
							onConfirm={handleConfirm}
							onCancel={hideDatePicker}
							is24Hour={true}
						//display= "default"
						//date={date}
						/>
					</View>
					<View style = {styles.Box2}>
						<Text style = {{flex: 1}}>{placeInfo?.place_name}</Text>
						<Button style = {{ flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}
							title="상호명" onPress={() => navigation.navigate("KeySearchScreen")}/>
						<TouchableOpacity>
						</TouchableOpacity>
					</View>
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
						<View > 
							<Text>목적</Text>
							{/* <SelectPicker */}
							<Picker
								mode={"dropdown"}
								textInputProps={{ underlineColorAndroid: "transparent"}}
								placeholder={{
									label: placeholder,
								}}
								fixAndroidTouchableBug={true}//안드로이드에서 클릭을 여러번해야 picker가 나오는 경우가 있어 추가를 하였습니다. true로 설정하면 이런 에러가 사라집니다.
								selectedValue={purpose}
								onValueChange={value =>  setPurpose(value)}
								useNativeAndroidPickerStyle={false}
							>
								<Picker.Item label="혼밥" value="SOLO" fontFamily="SF-Pro-Text-Semibold"/>
								<Picker.Item label="데이트" value="COUPLE" fontFamily="SF-Pro-Text-Semibold"/>
								<Picker.Item label="친구" value="FRIEND" fontFamily="SF-Pro-Text-Semibold"/>
								<Picker.Item label="가족" value="FAMILY" fontFamily="SF-Pro-Text-Semibold"/>
								<Picker.Item label="회식" value="MEETING" fontFamily="SF-Pro-Text-Semibold"/>
								<Picker.Item label="기타" value="ETC" fontFamily="SF-Pro-Text-Semibold"/>
							</Picker>
						</View>
					</Box6>
				
					<View style={{flexDirection: "row", justifyContent: "space-evenly", marginVertical: 10}}>
						<Button title="취소" color={"rgba(165, 212, 233, 0.5)"} containerStyle={styles.button} onPress={() => {navigation.goBack(), setResponse(null), setDate(null), setdefaultRating(null), setPlaceInfo(), setReview(null), setPurpose("SOLO")}} />
						<Button title="다음" color={"rgba(165, 212, 233, 0.5)"} containerStyle={styles.button} onPress={() => {createPostAxios(review, rating, purpose, placeInfo),setResponse(null), setdefaultRating(null), setPlaceInfo(),  setDate(null), setReview(null), setPurpose("SOLO")}}/>

					</View>
				</ScrollView>
			</Container> 
		</KeyboardAwareScrollView>
	)
}

export default UploadScreen