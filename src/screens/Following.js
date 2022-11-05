import React, { useEffect, useState } from "react"
import { FlatList, ScrollView, Text } from "react-native"
import UserSearchResult from "../components/UserSearchResult"
import { following } from "../service/subscribe"

const Following = ({navigation, route}) => {
	const [followingList, setFollowingList] = useState([])
	const [loading, setLoading] = useState(false)

	const wait = (timeout) => {
		return new Promise(resolve => setTimeout(resolve, timeout))
	}
	const [refreshing, setRefreshing] = React.useState(false)
	
	const onRefresh = React.useCallback(() => {
		setRefreshing(true)
		wait(2000).then(() => setRefreshing(false))
	}, [])

	const fetchFollowing = async () => {
		try {
			setLoading(true)
			const response = await following(route?.params)
			console.log(response.data)
			setFollowingList(response.data.content)
		} catch (error) {
			console.log("catch error", error)
		}
		setLoading(false)
	}

	useEffect(() => {
		fetchFollowing()
	},[route])

	return (
		<FlatList
			data={followingList}// fetch로 데이터 호출
			onRefresh={fetchFollowing}
			refreshing={refreshing}
			renderItem={({item}) => (<UserSearchResult item={item} onPress={() => navigation.navigate("account", item.memberId)}/>)}
		/>
	)
}

export default Following