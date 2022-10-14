import React from "react"
import { ScrollView, Text } from "react-native"
import UserSearchResult from "../components/UserSearchResult"

const Follower = ({navigation}) => {
	return (
		<ScrollView>
			<UserSearchResult item={{profileUrl: null, username: "dfwfwwg"}} onPress={() => navigation.navigate("account")}/>
		</ScrollView>
	)
}

export default Follower