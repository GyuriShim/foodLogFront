import React, { useState,useEffect, useLayoutEffect ,useCallback,useContext,} from "react"
import { FlatList,RefreshControl,View, Text, Pressable, Image, StyleSheet } from "react-native"
import { Location } from "../assets/icons/Location"
import UserPost from "../components/UserPost"
import { getPlacesByMember } from "../service/place"
import { getItemFromAsync } from "../utils/StorageFun.js"
import { getMember } from "../service/member.js"
import { getPost, getPostsByMemberAndPlace } from "../service/post"
import Post from "../components/Post"





const UserPostsScreen = ({navigation, route}) => {
	const [loading, setLoading] = useState(false)
	const [post, setPost] = useState([])
	const [userName, setUserName] = useState()
	const [error, setError] = useState(null)
	const [refreshing, setRefreshing] = useState(false)
	//const [rating, setRating] = useState()



	console.log("route", route)

	const wait = (timeout) => {
		return new Promise(resolve => setTimeout(resolve, timeout))
	}
	
	const onRefresh = useCallback(async() => {
		setRefreshing(true)
		wait(2000).then(() => setRefreshing(false))
	}, [refreshing])

	

	const fetchProfile = async () => {
		try{
			setLoading(true)
			const userInfo = JSON.parse(await getItemFromAsync("user"))
			const response = await getMember(route?.params.memberId)
			setUserName(response.data.username)
		} catch(e){
			console.log("catch error", e)
		}
		
		setLoading(false)
	}

	useLayoutEffect(()=>{
		navigation.setOptions({headerTitle: userName})
	}, [userName])
	

	const fetchPost = async () => {
		try {
			// 요청이 시작 할 때에는 error 와 users 를 초기화하고
			setError(null)
			// loading 상태를 true 로 바꿉니다.
			setLoading(true)
			//console.log("route", route)
			const response = await getPostsByMemberAndPlace(route?.params.memberId, route?.params.placeId)
			console.log(response.data)
			setPost(response.data)
			
		} catch (e) {
			setError(e)
			console.log("catch error", e)
		}
		setLoading(false)
	}
	useEffect(() => {
		fetchProfile()
		fetchPost()
	}, [route?.params])
	
	return(
		<View style={{alignItems: "center", flex:1, paddingHorizontal: 15}}>
			<FlatList 
				/* refreshControl={
					<RefreshControl */
				onRefresh={fetchPost}
				data={post}
				refreshing={refreshing}
				renderItem={({item})=> (<UserPost item={item} onPress={() => navigation.navigate("PostScreen",{ postId: item.postId })}/>)}
			/>
				
		</View>
	
	)
}



export default UserPostsScreen