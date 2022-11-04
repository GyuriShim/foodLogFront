import React, { useEffect, useState } from "react"
import { FlatList } from "react-native"
import UserSearchResult from "../components/UserSearchResult"
import { follower } from "../service/subscribe"

const Follower = ({navigation, route}) => {
	const [followerList, setFollowerList] = useState([])
	const [loading, setLoading] = useState(false)

	const wait = (timeout) => {
		return new Promise(resolve => setTimeout(resolve, timeout))
	}
	const [refreshing, setRefreshing] = React.useState(false)
	
	const onRefresh = React.useCallback(() => {
		setRefreshing(true)
		wait(2000).then(() => setRefreshing(false))
	}, [])

	const fetchFollower = async () => {
		try {
			setLoading(true)
			const response = await follower(route?.params)
			console.log(response.data)
			setFollowerList(response.data.content)
		} catch (error) {
			console.log("catch error", error)
		}
		setLoading(false)
	}

	useEffect(() => {
		fetchFollower()
	},[route])

	return (
		<FlatList
			data={followerList}
			onRefresh={fetchFollower} // fetch로 데이터 호출
			refreshing={refreshing} // state
			renderItem={({item}) => (<UserSearchResult item={item} onPress={() => navigation.navigate("account", item.memberId)}/>)}
		/>
	)
}

export default Follower