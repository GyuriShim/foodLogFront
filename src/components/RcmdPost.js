import React from "react"
import { Dimensions, View, Image, Text } from "react-native"
import { Location } from "../assets/icons/Location"

const RcmdPost = () => {
	const windowHeight = Dimensions.get("window").height
	const windowWidth = Dimensions.get("window").width

	return(
		<View style={{
			flexDirection: "row",
			width: "100%", 
			height: windowHeight*0.2, 
			backgroundColor: "rgba(196, 196, 196, 0.1)",
			marginBottom: 15
		}}>
			<Image style={{height: "100%", width: windowHeight*0.2, backgroundColor: "gray"}}/>
			<View style={{flexDirection: "column", width: windowWidth-30-windowHeight*0.2, padding: 5}}>
				<View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 2}}>
					<Text>상호명</Text>
					<Text>별점</Text>
				</View>
				<View style={{flexDirection: "row", alignItems: "center", marginBottom: 3}}>
					<Location name="location-outline" size={14}/>
					<Text>주소</Text>
				</View>
				<View>
					<Text numberOfLines={5}>게시물 내용</Text>
				</View>
			</View>
		</View>
	)
}

export default RcmdPost