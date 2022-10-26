import React from "react"
import { Pressable , Image, Text} from "react-native"

const UserSearchResult = ({item:{profilePicture, username, id}, onPress}) => {
	return(
		<Pressable style={{
			marginHorizontal: 10,
			padding: 10, 
			flexDirection:"row", 
			alignItems: "center", 
			borderBottomColor: "rgba(165, 212, 233, 0.5)", 
			borderBottomWidth: 1}}
		onPress={() => onPress()}
		>
			<Image style={{borderRadius: 90, backgroundColor: "gray", width: 45, height: 45}} source={{uri: profilePicture}}/>
			<Text style={{marginLeft: 10}}>{username}</Text>
		</Pressable>
	)
}

export default UserSearchResult