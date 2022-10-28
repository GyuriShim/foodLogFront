import React, { useState } from "react"
import { View, Text, Pressable, StyleSheet, Image } from "react-native"
import { Location } from "../assets/icons/Location"

function SearchResult({item:{name, address, averageRating}, navigation}) {
	const detailRating = Math.round(averageRating*10)/10
	const CustomRatingBar = () => {
		const defaultRating = Math.round(averageRating)
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
		<Pressable style={{padding: 10, borderBottomColor: "rgba(165, 212, 233, 0.5)", borderBottomWidth: 1}}>
			<View style={{flexDirection: "row", justifyContent: "space-between"}}>
				<Text>{name}</Text>
				<View style={{flexDirection: "row"}}>
					<CustomRatingBar/>
					<Text style={{fontSize:12}}>{"("}{detailRating}{")"}</Text>
				</View>
				
			</View>
			
			<View style={{flexDirection: "row", alignItems: "center"}}>
				<Location name="location-outline" size={14}/>
				<Text>{address}</Text> 
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

export default SearchResult
