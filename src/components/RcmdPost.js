import React, {useState} from "react"
import { Dimensions, View, Image, Text, Pressable, StyleSheet } from "react-native"
import { Location } from "../assets/icons/Location"

function RcmdPost({item:{imageUrl, store, address, contents, rating}, onPress}){
	const windowHeight = Dimensions.get("window").height
	const windowWidth = Dimensions.get("window").width

	const CustomRatingBar = () => {
		const defaultRating = rating
		const [maxRating, setMaxRating] = useState([1,2,3,4,5])
		const starImgFilled =  "https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png"
		const starImgCorner = "https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png"
		
		return (
			<View style={styles.customRatingBarStyle}>
				{
					maxRating.map((item, key)=>{
						return (
							<View
								activeOpacity={0.7}
								key= {item}
							>
								<Image
									style={styles.starImgStyle} 
									source={
										item <= defaultRating
											? {uri: starImgFilled}
											: {uri: starImgCorner}
									}
								/>
							</View>
						)						
					})
				}
			</View>
		)
	}

	return(
		<Pressable style={{
			flexDirection: "row",
			width: "100%", 
			height: windowHeight*0.2, 
			backgroundColor: "rgba(196, 196, 196, 0.1)",
			marginBottom: 15
		}} onPress={() => onPress()}>
			<Image style={{height: "100%", width: windowHeight*0.2, backgroundColor: "gray"}} source={{uri: imageUrl}}/>
			<View style={{flexDirection: "column", width: windowWidth-30-windowHeight*0.2, padding: 5}}>
				<View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 2}}>
					<Text>{store}</Text>
					<CustomRatingBar/>
				</View>
				<View style={{flexDirection: "row", alignItems: "center", marginBottom: 3}}>
					<Location name="location-outline" size={14}/>
					<Text>{address}</Text>
				</View>
				<View>
					<Text numberOfLines={5}>{contents}</Text>
				</View>
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	customRatingBarStyle : {
		justifyContent: "flex-end",
		flexDirection: "row",
		marginTop: 3,
	},
	starImgStyle : {
		padding: 5,
		width: 12,
		height: 12,
		resizeMode: "cover"
	},
})

export default RcmdPost