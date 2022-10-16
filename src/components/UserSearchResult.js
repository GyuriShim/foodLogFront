import React from "react"
import { Pressable , Image, Text} from "react-native"

function UserSearchResult({item:{profileUrl, username}, onPress}) {
	return(
		<Pressable style={{
			margin: 10,
			padding: 5, 
			flexDirection:"row", 
			alignItems: "center", 
			borderBottomColor: "rgba(165, 212, 233, 0.5)", 
			borderBottomWidth: 1}}
		onPress={() => onPress()}
		>
			<Image style={{borderRadius: 90, backgroundColor: "gray", width: 45, height: 45}} source={{uri: profileUrl}}/>
			<Text style={{marginLeft: 10}}>{username}</Text>
		</Pressable>
	)
}

export default UserSearchResult