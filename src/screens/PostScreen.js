import React, { useCallback, useEffect, useState, useContext } from "react"
import {RefreshControl,View, Text, Pressable, StyleSheet, Image, ScrollView, TouchableOpacity,KeyboardAvoidingView, Platform, ActivityIndicator}from "react-native"
import { FlatList, TextInput } from "react-native-gesture-handler"
import {Location} from "../assets/icons/Location"
import styled from "styled-components"
import Button from "../components/Button"
import { getPost } from "../service/post"
import { deletePost } from "../service/post"
import { createComment, deleteComment } from "../service/comment"
import { getItemFromAsync } from "../utils/StorageFun"
import UserIdContext from "../contexts/UserId"
import { formatDate } from "../utils/FormatDate"

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
		padding: 10,
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
		padding: 10
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
	const [comments, setComments] = useState([])
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

	const wait = (timeout) => {
		return new Promise(resolve => setTimeout(resolve, timeout))
	}
	const [refreshing, setRefreshing] = React.useState(false)
	
	const onRefresh = useCallback(() => {
		//React.
		setRefreshing(true)
		wait(2000).then(() => setRefreshing(false))
	}, [])

	const fetchPost = async () => {
		try {
			// 요청이 시작 할 때에는 error 와 users 를 초기화하고
			setError(null)
			// loading 상태를 true 로 바꿉니다.
			setLoading(true)
			console.log("route", route)
			const userInfo = JSON.parse(await getItemFromAsync("user"))
			const response = await getPost(route?.params.postId)
			setPost(response.data)
			setPlace(response.data.place)
			setComments(response.data.comment)
			setPictures(response.data.pictures)
			setPostId(response.data.postId)
			setDate(formatDate(response.data.date))
			setRating(response.data.rating)
			setWriterId(response.data.memberId)
			setPurpose(response.data.purpose)
			console.log(response.data.postId)
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
					setIsChanged(!isChanged)
				}
			})
			.catch((error)=> {
				console.log(error)
			})
	}

	function Comment(comment, username, createdDate, memberProfileImage, commentId, memberId) {
		return(
			<View style={{flexDirection: "row", padding: 7, width: "98%", justifyContent:"space-between", borderBottomColor: "rgba(165, 212, 233, 0.5)", borderBottomWidth: 2, alignItems:"center"}}>
				<View style={{flexDirection: "row", alignItems: "center"}}>
					<Pressable onPress={() => navigation.navigate("account", memberId)}>
						<Image style={styles.commentProfile} source={{uri:memberProfileImage}}/>
					</Pressable>
					<View style={{flexDirection: "column"}}>
						<Pressable onPress={() => navigation.navigate("account", memberId)}>
							<Text style={{fontWeight: "bold"}}>{username}</Text>
						</Pressable>
						<Text>{comment}</Text>
						<Text style={{fontSize: 10}}>{formatDate(createdDate)}</Text>
					</View>
				</View>
				<View>
					{userId===memberId &&<Button title="삭제" onPress={() => deleteCommentAxios(postId, commentId)}/>}
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

	return(
		<ScrollView style={styles.avoid}
			refreshControl={
				<RefreshControl
					refreshing={refreshing}
					onRefresh={onRefresh}/>}>
			<View style={{width: "100%", marginBottom: 15, paddingBottom: 5, paddingHorizontal: 5}}>
				<View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 5}}>   
					<Pressable onPress={() => navigation.navigate("account", writerId)}>
						<View style={{flexDirection: "row", alignItems: "center"}}>
							<Image style={styles.profile}/>
							<Text>{post.member}</Text> 
						</View>
					</Pressable>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Text style={{marginRight: 5}}>{date}</Text>
						{userId ===  writerId&& <Button title="삭제" onPress={() => deletePostAxios(postId)}/>}
						{userId ===  writerId&&<Button title="수정" onPress= {() => {navigation.navigate("UpdateScreen", postId)}}></Button>}
						
					</View>
				</View>
				<View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
					<ScrollView
						horizontal={true}>
						<Image
							style={{width: 200, height:200, justifyContent: "center", alignItems: "center"}}
							source={{uri: pictures[0]}}
							resizeMode="cover"
						/>
						<Image
							style={{width: 200, height:200, justifyContent: "center", alignItems: "center"}}
							source={{uri: pictures[1]}}
							resizeMode="cover"
						/>
						<Image
							style={{width: 200, height:200, justifyContent: "center", alignItems: "center"}}
							source={{uri: pictures[2]}}
							resizeMode="cover"
						/>
						<Image
							style={{width: 200, height:200, justifyContent: "center", alignItems: "center"}}
							source={{uri: pictures[3]}}
							resizeMode="cover"
						/>
						<Image
							style={{width: 200, height:200, justifyContent: "center", alignItems: "center"}}
							source={{uri: pictures[4]}}
							resizeMode="cover"
						/>
					</ScrollView>
				</View>
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
					<Button title="등록" onPress={() => createCommentAxios(postId, commentContent)}/>
					{/* <View style = {styles.button}>
						</View> */}
				</TouchableOpacity>
			</View>
			<View>
				{comments.map((comment, key) =>{
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