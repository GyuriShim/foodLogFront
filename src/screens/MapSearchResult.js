import React, { useContext } from "react"
import { Pressable, Text, TextInput, View } from "react-native"
import MapView from "react-native-maps"
import SearchContext from "../contexts/SearchContext"

const MapSearchResult = ({navigation}) => {
	const {keyword} = useContext(SearchContext)
	return(
		<View style={{backgroundColor: "white", flex: 1, padding: 15, justifyContent: "space-between"}}>
			<Pressable 
				style={{
					height: 44,
					width: "100%", 
					borderColor: "rgba(165, 212, 233, 0.5)", 
					borderWidth: 5,
					borderRadius: 90,
					paddingLeft: 20,
					justifyContent: "center"
				}}
				onPress={() => navigation.navigate("search")}
			>
				<Text>{keyword}</Text>
			</Pressable>
			<Pressable onPress={()=>navigation.goBack()}>
				<Text>검색창으로 돌아가기</Text>
			</Pressable>
			<MapView
				style={{height: "85%", width: "100%"}}
				initialRegion={{
					latitude: 35.90, 
					longitude: 127.5,
					latitudeDelta: 4.3,
					longitudeDelta: 4.3
				}}
				customMapStyle={mapStyle}>

			</MapView> 
		</View>
	)
	
	
}

export default MapSearchResult

const mapStyle = [
	{
		"stylers": [
			{
				"lightness": 15
			}
		]
	},
	{
		"featureType": "road",
		"stylers": [
			{
				"visibility": "simplified"
			}
		]
	}
]