import React,{useState, useEffect} from "react"
import {ScrollView, Image, View, Text,  TouchableOpacity, Platform, TextInput, ActivityIndicator, StyleSheet} from "react-native"
import axios from "axios"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import styled from "styled-components"
import Button from "../components/Button"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import RNPickerSelect from "react-native-picker-select"
import {selectImage} from "../screens/UploadScreen"
import {CustomRatingBar} from "../screens/UploadScreen"
import { getPost } from "../service/post"
import { updatePost } from "../service/post"

const Container = styled.View` 
  flex: 10
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
const Box5 = styled.View`
  flex: 10
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


function UpdateScreen({navigation, route}){
	const [response, setResponse] = useState(null)
	const [date, setDate] = useState("")
	const [review, setReview] = useState()
	const [place, setPlace] = useState({})
	const [defaultRating, setdefaultRating] =useState(0)
	const [maxRating, setMaxRating] = useState([1,2,3,4,5])
	const [rating, setRating] = useState()
	const starImgFilled =  "https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png"
	const starImgCorner = "https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png"
	const [purpose, setPurpose] = useState()
	const [loading, setLoading] = useState(false)
	const [pictures, setPictures] = useState([])
	const [post, setPost] = useState({})
	const [error, setError] = useState(null)
	const [comment, setComment] = useState([])

	const postId = route.params

	const handleConfirm = (date) => {
		console.log(date)
		var splitDate = date.toISOString().split("T")
		console.log(splitDate)
		setDate(splitDate[0])
		//hideDatePicker()
	}

	const fetchPost = async () => {
		try {
			// 요청이 시작 할 때에는 error 와 users 를 초기화하고
			setError(null)
			// loading 상태를 true 로 바꿉니다.
			setLoading(true)
			const response = await getPost(route?.params)
			setPost(response.data)
			//setPlace(response.data.place)
			//setComment(response.data.comment)
			setPictures(response.data.pictures)
			setDate(response.data.date)
			setPlace(response.data.place)
			setRating(response.data.rating)
			setPurpose(response.data.purpose)
			setReview(response.data.review)
		} catch (e) {
			setError(e)
			console.log("catch error", e)
		}
		setLoading(false)
	}

	useEffect(() => {
		fetchPost()
	}, [])

	//console.log("data : ", post)
	//console.log("pictures" , pictures)
	//console.log("date", date)
	//console.log("place",place)

	// console.log("Picture", post.pictures[0])

	if (loading) return <Text>로딩 중</Text>

	const updatePostAxios = async(postId, review) => {
		console.log("postId:", postId)
		
		setLoading(false)
		await updatePost(postId, review)
			.then(response => {
				if(response){
					console.log("UpdateScreen:" ,response.data)

					console.log("update post success")
				}
			})
			.catch((error)=> {
				console.log(error)	
			})
		setLoading(true)
		navigation.navigate("PostScreen", [review,postId])
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
								/* onPress = {()=>{setdefaultRating(item),
                                setRating(item) 
								console.log(rating)
								}}*/
							>
								<Image
									style={styles.starImgStyle} 
									source={
										item <= rating
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





	return(
		<KeyboardAwareScrollView contentContainerStyle={{flex:1, backgroundColor:"white"}}>
			<Container >
				<ScrollView>
					<Box1>
						<View style={{flex:0, padding:1}}>
							<Image
								style={{width: 200, height:200, justifyContent: "center", alignItems: "center"}}
								//source={{uri: response?.assets[0]?.uri}}
								source={{ uri: pictures[0] }}
								resizeMode="cover"
							/>
						</View>
					</Box1>
					<View style = {styles.Box2}>
						{date ? 
							<Text style={{flex: 1}}>{date}</Text> :
							<Text style={{flex: 1}}>날짜</Text>}
					</View>
					<Box3>
						<View style = {{flex: 0, padding: 1}}>
							{place ?
								<Text style={{flex: 1}}>{place.name}</Text> :
								<Text style={{flex: 1}}>상호명</Text>}
						</View>
					</Box3>
					<Box4>
						<CustomRatingBar
							value={rating}
						/>
					</Box4>
					<View style = {styles.Box5}>	
						<TextInput
							style = {styled.input}
							multiline = {true}
							placeholder = "내용을 입력하세요"
							textAlignVertical="center"
							onChangeText={ text => setReview(text)}
							value={review}
						/>
					</View>
					<Box6>
						<View>
							{purpose ?
								<Text style={{flex: 1}}>{post.purpose}
								</Text> :
								<Text style={{flex: 1}}>목적
								</Text>
							}
						</View>
					</Box6>
				</ScrollView>
				<View style={{flexDirection: "row", justifyContent: "space-evenly", paddingTop:"5%"}}>
					<Button title="취소" color={"rgba(165, 212, 233, 0.5)"} containerStyle={styles.button} onPress={() => {navigation.goBack(), setResponse(null),setPurpose(null)}} />
					{loading ? (
						<ActivityIndicator style={styles.spinner} />
					) :  (
						<Button title="수정" color={"rgba(165, 212, 233, 0.5)"} containerStyle={styles.button} onPress={() => {updatePostAxios(postId, review)}}/>
					)}
				</View>
			</Container>
		</KeyboardAwareScrollView>
	)
}
const styles = StyleSheet.create({
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
	Box5:{
		flex:10,
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
})

export default UpdateScreen
