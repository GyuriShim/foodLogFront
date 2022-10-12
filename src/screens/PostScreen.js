import React, { useEffect, useState } from "react"
import axios from "axios"
import {View, Text, Pressable, StyleSheet, Image, ScrollView, TouchableOpacity,KeyboardAvoidingView, Platform}from "react-native"
import { TextInput } from "react-native-gesture-handler"
import {Location} from "../assets/icons/Location"
//import {CustomRatingBar} from "../screens/UploadScreen"
import styled from "styled-components"
import Button from "../components/Button"
import { format, formatDistanceToNow } from "date-fns"
import {ko} from "date-fns/locale"

const Box1 = styled.View`
  flex: 1
  border-radius: 10px
  margin: 3px 40px
  background-color: white
  border: 4px rgba(164, 212, 234, 0.6)
  align-items: flex-start
`

const styles = StyleSheet.create({
	profile: {
		width: 40,
		height: 40,
		borderRadius: 50,
		backgroundColor: "black",
		alignItems: "center",
		marginRight: 5
	},
	customRatingBarStyle : {
		justifyContent: "flex-end",
		flexDirection: "row",
		marginTop: 3,
	},
	starImgStyle : {
		padding: 15,
		width: 10,
		height: 10,
		resizeMode: "cover"
	},
	button: {
		alignItems: "center",
		width: 45,
		height: 35,
		justifyContent: "center",
		//marginHorizontal: 10,
		borderRadius: 7
	},
	block:{
		height: 50,
		paddingHorizontal: 16,
		borderColor: "#C9EEFF",
		borderTopWidth: 2,
		borderBottomWidth: 2,
		alignContent: "center",
		flexDirection: "row",
		//justifyContent: "center",
	},
	input: {
		flex : 1,
		fontSize: 10,
		paddingVertical: 10,
	},
	avoid:{
		flex:1,
	},
})

function PostScreen(date){
	const [text, setText] = useState("")
	const [defaultRating, setdefaultRating] =useState(5)
	const [maxRating, setMaxRating] = useState([1,2,3,4,5])
	const starImgFilled =  "https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png"
	const starImgCorner = "https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png"
	const [post, setPost] = useState({})
	const [place, setPlace] = useState({})
	const [pictures, setPictures] = useState([])
	const [comment, setComment] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const fetchPost = async () => {
		try {
			// 요청이 시작 할 때에는 error 와 users 를 초기화하고
			setError(null)
			// loading 상태를 true 로 바꿉니다.
			setLoading(true)
			const response = await axios.get("http://food-log-dku.com:8080/api/v1/post/37", {
				headers: {
					"ACCESS-TOKEN" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MkBnbWFpbC5jb20iLCJpc3MiOiJmb29kIGxvZyIsIm1lbWJlcklkIjoxMSwiaWF0IjoxNjY1Mzc4MTEzLCJleHAiOjE2NjUzODg5MTN9.Jsjr8GXurCMk6Y3MfIKJC9uMGRNnubWNgmnm7Fw8iZkwdhJeQFFB8zHJ7hObedQuI6FRPP9oRgZb1qFGhoOKfQ"
				}
			})
			setPost(response.data)
			setPlace(response.data.place)
			setComment(response.data.comment)
			setPictures(response.data.pictures)
			// .then((res) => {
			// 	if (res.status === 200) {
			// 		setPost(res.data)
			// 		console.log("hihihihi",res.data.member)
			// 	} else {
			// 		console.log(res)
			// 	}
			// })
			// .catch((error) => {
			// 	console.log("get Post error", error)
			// })

		} catch (e) {
			setError(e)
			console.log("catch error", e)
		}

		setLoading(false)
	}

	useEffect(() => {
		fetchPost()
	}, [])

	console.log("data : ", post)
	console.log("pictures" , pictures)
	// console.log("Picture", post.pictures[0])

	if (loading) return <Text>로딩 중</Text>

	const CustomRatingBar = () => {
		return (
			<View style={styles.customRatingBarStyle}>
				{
					maxRating.map((item, key)=>{
						return (
							<View
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
							</View>
						)						
					})
				}
			</View>
		)
	}

	const formatDate = () => {
		const d = new Date(date)
		const now = Date.now()
		const diff = (now - d.getTime()) / 1000// 현재 시간과의 차이(초)
		if (diff < 60 * 1) { // 1분 미만일땐 방금 전 표기
			return "방금 전"
		}
		if (diff < 60 * 60 * 24 * 3) { // 3일 미만일땐 시간차이 출력(몇시간 전, 몇일 전)
			return formatDistanceToNow(d, {addSuffix: true, locale: ko})
		}
		return format(d, "PPP EEE p", {locale: ko}) // 날짜 포맷
	}

	return(

		<ScrollView>
			<KeyboardAvoidingView 
				behavior={Platform.OS === "android" ? "padding" : undefined}
				style={styles.avoid}>
				<View style={{width: "100%", /* backgroundColor: "rgba(165, 212, 233, 0.3)", */ marginBottom: 15, paddingBottom: 5, paddingHorizontal: 5}}>
					<View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 5}}>   
						<Pressable>
							<View style={{flexDirection: "row", alignItems: "center"}}>
								<Image style={styles.profile}/>
								<Text>{post.member}</Text> 
							</View>
						</Pressable>
						<Text>{/* formatDate(date) */}</Text>
					</View>
					<Image style={{ width: "100%", height: 350, backgroundColor: "white", marginBottom: 5 }}
						source={{ uri: pictures[0] }}
					/>
					<View style ={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
						<Text style={{fontSize: 16}}>{place.name}</Text>
						<CustomRatingBar/> 
					</View>
					<View style={{flexDirection: "row", alignItems: "center", marginBottom: 10}}>
						<Location name="location-outline" size={14}/>
						<Text>{place.address}</Text>
					</View>
					<Text>
						{post.review}
					</Text>
				</View>
			
				<View style = {styles.block}>
					{/* style ={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}  */}
					<TextInput
						style = {styles.input}
						//multiline = {true}
						placeholder = "댓글을 입력하세요"
						value={text}
						onChangeText={setText}
					//textAlignVertical="center"
					/>
					<TouchableOpacity style = {{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}} activeOpacity={0.5}>
						<Button title="등록" onPress={() => {}}/>
						{/* <View style = {styles.button}>
						</View> */}
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</ScrollView>
	)
}


export default PostScreen