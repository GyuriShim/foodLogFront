import React from "react"
import { View, Text, Pressable } from "react-native"
import { Location } from "../assets/icons/Location"

function SearchResult({item:{store, address}, navigation}) {
	return(
		<Pressable style={{padding: 10, borderBottomColor: "rgba(165, 212, 233, 0.5)", borderBottomWidth: 1}}>
			<Text>{store}</Text>
			<View style={{flexDirection: "row", alignItems: "center"}}>
				<Location name="location-outline" size={14}/>
				<Text>{address}</Text> 
			</View>
			
		</Pressable>
	)
}
export default SearchResult
