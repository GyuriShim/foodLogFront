import React, { useState } from "react"
import { Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native"
import { Location } from "../assets/icons/Location"

const UserPost = ({item:{rating, place, picture, review, date}, onPress}) => {
	const defaultRating = rating
	const [maxRating, setMaxRating] = useState([1,2,3,4,5])
	const {width} = useWindowDimensions()
	const starImgFilled =  "https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png"
	const starImgCorner = "https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png"

	const CustomRatingBar = () => {
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
		<Pressable style={{width: "100%", backgroundColor: "rgba(165, 212, 233, 0.3)", marginBottom: 15, padding:5}}
			onPress={() => onPress()}>
			<Image style={{width: width*0.89, height: width*0.89, backgroundColor: "white", marginBottom: 5}} source={{uri: picture}}/>
			<View style={{flexDirection: "row", alignItems: "center", justifyContent:"space-between"}}>
				<Text style={{fontSize: 16}}>{place.name}</Text>
				<CustomRatingBar/>
			</View>
				
			<View style={{flexDirection: "row", alignItems: "center", marginBottom: 10}}>
				<Location name="location-outline" size={14}/>
				<Text>{place.address}</Text>
			</View>
			<Text numberOfLines={3} ellipsizeMode="tail">
				{review}
			</Text>
			<Text style={{fontSize: 10, marginTop: 5}}>{date}</Text>
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
		padding: 8,
		width: 10,
		height: 10,
		resizeMode: "cover"
	},
})

export default UserPost