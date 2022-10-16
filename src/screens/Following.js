import React from "react"
import { ScrollView, Text } from "react-native"
import UserSearchResult from "../components/UserSearchResult"

const Following = ({navigation}) => {
	return (
		<ScrollView>
			<UserSearchResult item={{profileUrl: null, username: "wfdwefe"}} onPress={() => navigation.navigate("account")}/>
		</ScrollView>
	)
}

export default Following