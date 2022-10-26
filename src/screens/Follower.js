import React, { useEffect, useState } from "react"
import { FlatList } from "react-native"
import UserSearchResult from "../components/UserSearchResult"
import { follower } from "../service/subscribe"

const Follower = ({navigation, route}) => {
	const [followerList, setFollowerList] = useState([])
	const [loading, setLoading] = useState(false)

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
	},[])

	return (
		<FlatList
			data={followerList}
			renderItem={({item}) => (<UserSearchResult item={item} onPress={() => navigation.navigate("account", item.memberId)}/>)}
		/>
	)
}

export default Follower