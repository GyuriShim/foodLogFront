import React, { useCallback, useEffect, useState, useContext } from "react"
import {View, Text, Pressable, StyleSheet, Image, ScrollView, TouchableOpacity,KeyboardAvoidingView, Platform, ActivityIndicator}from "react-native"
import { FlatList, TextInput } from "react-native-gesture-handler"
import {Location} from "../assets/icons/Location"
import styled from "styled-components"
import Button from "../components/Button"
import { format, formatDistanceToNow } from "date-fns"
import {ko} from "date-fns/locale"
import { getPost } from "../service/post"
import { deletePost } from "../service/post"
import { createComment, deleteComment } from "../service/comment"
import { getItemFromAsync } from "../utils/StorageFun"
import UserIdContext from "../contexts/UserId"

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
		borderWidth: 2,
		borderRadius: 5,
		alignContent: "center",
		flexDirection: "row",
		width: "100%",
		backgroundColor: "white",
	},
	input: {
		flex : 1,
		fontSize: 16,
		paddingVertical: 10,
	},
	avoid:{
		flex: 1,
		padding: 10,
	},
	commentProfile: {
		width: 40,
		height: 40,
		borderRadius: 50,
		backgroundColor: "black",
		alignItems: "center",
		marginRight: 10
	}
})


function PostScreen({navigation, route}){
	const [text, setText] = useState("")
	const [defaultRating, setdefaultRating] =useState(5)
	const [maxRating, setMaxRating] = useState([1,2,3,4,5])
	const starImgFilled =  "https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png"
	const starImgCorner = "https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png"
	const [post, setPost] = useState({})
	const [place, setPlace] = useState({})
	const [pictures, setPictures] = useState([])
	const [purpose, setPurpose] = useState()
	const [comment, setComment] = useState([])
	//const onSubmit(comment: string): void
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [postId, setPostId] = useState(0)
	const [writerId, setWriterId] = useState(0)
	const [date, setDate] = useState("")
	const [rating, setRating] = useState()
	const [commentContent, setCommentContent] = useState()
	const [isChanged, setIsChanged] = useState(false)
	const {userId} = useContext(UserIdContext)

	const fetchPost = async () => {
		try {
			// 요청이 시작 할 때에는 error 와 users 를 초기화하고
			setError(null)
			// loading 상태를 true 로 바꿉니다.
			setLoading(true)
			console.log("route", route)
			const userInfo = JSON.parse(await getItemFromAsync("user"))
			const response = await getPost(route?.params)
			setPost(response.data)
			setPlace(response.data.place)
			setComment(response.data.comment)
			setPictures(response.data.pictures)
			setPostId(response.data.postId)
			setDate(response.data.date)
			setRating(response.data.rating)
			setWriterId(response.data.memberId)
			setPurpose(response.data.purpose)
		} catch (e) {
			setError(e)
			console.log("catch error", e)
		}
		setLoading(false)
	}
	
	const deletePostAxios = async(postId) => {
		await deletePost(postId)
			.then(response => {
				if(response){
					console.log(response)
					console.log("delete post success")
				}
			})
			.catch((error)=> {
				console.log(error)
			})
	}

	const createCommentAxios = async(postId, comment) => {
		await createComment(postId, comment)
			.then(response => {
				if(response){
					console.log(response.data)
					console.log("create comment success")
					setIsChanged(!isChanged)
				}
			})
			.catch((error)=> {
				console.log(error)
			})
	}
	const deleteCommentAxios = async(postId, commentId) => {
		await deleteComment(postId, commentId)
			.then(response => {
				if(response){
					console.log(response.data)
					console.log("delete comment success")
					setIsChanged(!isChanged)
				}
			})
			.catch((error)=> {
				console.log(error)
			})
	}
	function Comment(comment, username, createdDate, memberProfileImage, commentId, memberId) {
		const {userId} = useContext(UserIdContext)
		return(
			<View style={{flexDirection: "row", padding: 7, width: "100%", justifyContent:"space-between", borderBottomColor: "rgba(165, 212, 233, 0.5)", borderBottomWidth: 2, alignItems:"center"}}>
				<View style={{flexDirection: "row", alignItems: "center"}}>
					<Pressable onPress={() => navigation.navigate("account", userId)}>
						<Image style={styles.commentProfile} source={{uri: "https://foodlogstorage.s3.ap-northeast-2.amazonaws.com/62373507-575e-424d-8965-67a845d8a93a.png"}}/>
					</Pressable>
					<View style={{flexDirection: "column"}}>
						<Pressable onPress={() => navigation.navigate("account", userId)}>
							<Text style={{fontWeight: "bold"}}>{username}</Text>
						</Pressable>
						<Text>{comment}</Text>
						<Text style={{fontSize: 10}}>{createdDate}</Text>
					</View>
				</View>
				<View>
					{userId===memberId &&<Button title="삭제" onPress={() => deleteCommentAxios(37, commentId)}/>}
				</View>		
			</View>
		)
	}
	

	useEffect(() => {
		fetchPost()
	}, [route.params, isChanged])


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
		<ScrollView style={styles.avoid}>
			<View style={{width: "100%", marginBottom: 15, paddingBottom: 5, paddingHorizontal: 5}}>
				<View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 5}}>   
					<Pressable>
						<View style={{flexDirection: "row", alignItems: "center"}}>
							<Image style={styles.profile}/>
							<Text>{post.member}</Text> 
						</View>
					</Pressable>
					<View style={{flexDirection: "row", alignItems: "center"}}>
						{userId ===  writerId&& <Button title="삭제" onPress={() => deletePostAxios(40)}/>}
						{userId ===  writerId&&<Button title="수정" onPress= {() => {navigation.navigate("UpdateScreen", postId)}}></Button>}
						<Text>{/* formatDate(date) */}</Text>
					</View>
				</View>
				<Image style={{ width: "100%", height: 350, backgroundColor: "white", marginBottom: 5 }}
					source={{ uri: pictures[0] }}
				/>
				<View style ={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
					<Text style={{fontSize: 16}}>{place.name}</Text>
					<CustomRatingBar
					/> 
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
					onChangeText={text => setCommentContent(text)}
					//textAlignVertical="center"
				/>
				<TouchableOpacity style = {{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}} activeOpacity={0.5}>
					<Button title="등록" onPress={() => createCommentAxios(37, commentContent)}/>
					{/* <View style = {styles.button}>
						</View> */}
				</TouchableOpacity>
			</View>
			<View>
				{comment.map((comment, key) =>{
						return (
							<View>
								{
									Comment(comment.comment,
										comment.username,
										comment.createdDate,
										comment.memberProfileImage,
										comment.commentId,
										comment.memberId)
								}
							</View>	
						)
					})}
			</View>
		</ScrollView>
	)
}


export default PostScreen