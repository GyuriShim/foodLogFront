import React, {useContext} from "react"
import { Image, Text, View, StyleSheet, Pressable} from "react-native"
import UserIdContext from "../contexts/UserId"
import Button from "./Button"

function Comment({item:{comment, username, createdDate, memberId, memberProfileImage}, onPress, onProfilePress}) {
	const {userId} = useContext(UserIdContext)
	return(
		<View style={{flexDirection: "row", padding: 7, width: "100%", justifyContent:"space-between", borderBottomColor: "rgba(165, 212, 233, 0.5)", borderBottomWidth: 2, alignItems:"center"}}>
			<View style={{flexDirection: "row", alignItems: "center"}}>
				<Pressable onPress={() => onProfilePress()}>
					<Image style={styles.commentProfile} source={{uri: memberProfileImage}}/>
				</Pressable>
				<View style={{flexDirection: "column"}}>
					<Pressable onPress={() => onProfilePress()}>
						<Text style={{fontWeight: "bold"}}>{username}</Text>
					</Pressable>
					<Text>{comment}</Text>
					<Text style={{fontSize: 10}}>{createdDate}</Text>
				</View>
			</View>

			<View>
				{userId===memberId &&<Button title="삭제" onPress={() => onPress()}/>}
			</View>
				
		</View>
	)
}

const styles = StyleSheet.create({
	commentProfile: {
		width: 40,
		height: 40,
		borderRadius: 50,
		backgroundColor: "black",
		alignItems: "center",
		marginRight: 10
	}
})

export default Comment