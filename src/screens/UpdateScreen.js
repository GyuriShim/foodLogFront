import React,{useState, useEffect} from "react"
import {ScrollView, Image, View, Text,  TouchableOpacity, Platform, TextInput, ActivityIndicator, StyleSheet, useWindowDimensions, FlatList} from "react-native"
import axios from "axios"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import styled from "styled-components"
import Button from "../components/Button"
import DateTimePickerModal from "react-native-modal-datetime-picker"
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
	const [updateLoading, setUpdateLoading] = useState(false)
	const [pictures, setPictures] = useState([])
	const [post, setPost] = useState({})
	const [error, setError] = useState(null)
	const [comment, setComment] = useState([])
	const {width} = useWindowDimensions()

	const postId = route.params

	const handleConfirm = (date) => {
		console.log(date)
		var splitDate = date.toISOString().split("T")
		console.log(splitDate)
		setDate(splitDate[0])
		//hideDatePicker()
	}

	const fetchPost = async () => {
		setLoading(true)
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

	if (loading) return <Text>로딩 중</Text>

	const updatePostAxios = async(postId, review) => {
		console.log("postId:", postId)
		
		setLoading(true)
		await updatePost(postId, review)
			.then(response => {
				if(response){
					console.log("UpdateScreen:", response.data)
					navigation.navigate("PostScreen", { postId: postId, review:review })
				}
			})
			.catch((error)=> {
				console.log(error)	
			})
		setLoading(false)
		
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

	const FlatlistImage = ({item}) => {
		return (
			<Image
				style={{width: width*0.9, height:width*0.9, justifyContent: "center", alignItems: "center", marginRight: 5}}
				source={{uri: item}}
				resizeMode="cover"
			/>

		)
	}

	return(
		<KeyboardAwareScrollView contentContainerStyle={{flex:1, backgroundColor:"white"}}>
			<Container >
				<ScrollView>
					<Box1>
						<View style={{alignItems: "center", flex: 1, height: width*0.9}}>
							<FlatList
								data={pictures}
								horizontal={true}
								renderItem = {({item,index}) => (<FlatlistImage item={item}/>)}
							/>
						</View>
					</Box1>
					<View style = {styles.Box2}>
						<Text style={{flex: 1}}>{date}</Text>
					</View>
					<View style = {styles.Box2}>
						<Text style={{flex: 1}}>{place.name}</Text>
					</View>
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
							<Text style={{flex: 1}}>
								{post.purpose}
							</Text> 
						</View>
					</Box6>
					<View style={{flexDirection: "row", justifyContent: "space-evenly", paddingTop:"1%", marginBottom: 20}}>
						<Button title="취소" color={"rgba(165, 212, 233, 0.5)"} containerStyle={styles.button} onPress={() => {navigation.goBack(), setResponse(null),setPurpose(null)}} />
						<Button title="수정" color={"rgba(165, 212, 233, 0.5)"} containerStyle={styles.button} onPress={() => {updatePostAxios(postId, review)}}/>
					</View>
				</ScrollView>
				
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
		height: 30
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
