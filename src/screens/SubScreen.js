import React, { useContext, useLayoutEffect, useState } from "react"
import { Button, FlatList, ScrollView, StatusBar, TextInput, View } from "react-native"
import styled from "styled-components"
import Post from "../components/Post"
import { ProgressContext } from "../contexts/Progress"
import { subscriberPost } from "../service/post"

const Container = styled.View`
    align-items: center
    background-color: white
	padding: 0px 15px 15px 15px
`
const SubScreen = ({navigation}) => {
	const {spinner} = useContext(ProgressContext)
	const [postList, setPostList] = useState([])

	const wait = (timeout) => {
		return new Promise(resolve => setTimeout(resolve, timeout))
	}
	const [refreshing, setRefreshing] = React.useState(false)
	
	const onRefresh = React.useCallback(() => {
		setRefreshing(true)
		wait(2000).then(() => setRefreshing(false))
	}, [])

	const fetchSubscriberPost = async() => {
		try {
			spinner.start()
			const response = await subscriberPost()
			setPostList(response.data.content)
			console.log(response.data.content)
		} catch (error) {
			console.log("error", error)
		} finally {
			spinner.stop()
		}
	}

	useLayoutEffect(() => {
		fetchSubscriberPost()
	},[])

	return(
		<>
			<StatusBar backgroundColor="white" barStyle="dark-content"/>
			<Container>
				<TextInput 
					style={{
						height: 44,
						width: "100%", 
						borderColor: "rgba(165, 212, 233, 0.5)", 
						borderWidth: 5,
						borderRadius: 90,
						paddingLeft: 20
					}}
					placeholder="사용자 검색"
					onPressIn={() => navigation.navigate("subSearch")}
				/>
			</Container>
			<View style={{flex: 1, backgroundColor: "white", paddingHorizontal: 15}}>
				<FlatList
					onRefresh={fetchSubscriberPost}
					refreshing={refreshing}
					data={postList}
					renderItem={({ item }) => (<Post item={item} onProfilePress={() => navigation.navigate("account", item.memberId)} onPostPress={() => navigation.navigate("PostScreen", { postId: item.postId })}/>)}
				/>
			</View>
		</>
	)
}
export default SubScreen
