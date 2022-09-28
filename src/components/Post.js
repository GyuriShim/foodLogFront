import React from "react"
import { Pressable, View, Image, StyleSheet, Text } from "react-native"
import { Location } from "../assets/icons/Location"

const Post = ({onPress}) => {
	return(
		<View style={{width: "100%", backgroundColor: "rgba(165, 212, 233, 0.3)", marginBottom: 15, paddingBottom: 5, paddingHorizontal: 5}}>
			<View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 5}}>   
				<Pressable onPress={() => onPress()}>
					<View style={{flexDirection: "row", alignItems: "center"}}>
						<Image style={styles.profile}/>
						<Text>dfjlkwjk</Text> 
					</View>
				</Pressable>
				<Text>2022.09.21</Text>
			</View>
			<Image style={{width: "100%", height: 350, backgroundColor: "white", marginBottom: 5}}/>
			<Text style={{fontSize: 16}}>엄지네 포장마차</Text>
			<View style={{flexDirection: "row", alignItems: "center", marginBottom: 10}}>
				<Location name="location-outline" size={14}/>
				<Text>강원 강릉시 남구길30번길 22</Text>
			</View>
			<Text numberOfLines={3}>
                아주 맛있었다. 강릉에 또 간다면 무조건 들를 맛집이다. 그리고 너무 행복했던 여행 
			</Text>
		</View>
	)
}
    

const styles = StyleSheet.create({
	profile: {
		width: 40,
		height: 40,
		borderRadius: 50,
		backgroundColor: "black",
		alignItems: "center",
		marginRight: 5
	}
})

export default Post