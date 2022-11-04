import React, { useContext } from "react"
import { Pressable, Text, StyleSheet, View, Dimensions } from "react-native"
import MapView from "react-native-maps"
import SearchContext from "../contexts/SearchContext"


const windowWidth = Dimensions.get("window").width

const MapSearchResult = ({navigation}) => {
	const {keyword} = useContext(SearchContext)
	return(
		<View style={{backgroundColor: "white", flex: 1, padding: 15, justifyContent:"space-between"}}>
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
			<MapView
				style={{height: "90%", width: "100%"}}
				initialRegion={{
					latitude: 35.90, 
					longitude: 127.5,
					latitudeDelta: 4.3,
					longitudeDelta: 4.3
				}}
				customMapStyle={mapStyle}>
			</MapView>
			<Pressable style={styles.mapBtm} onPress={()=>navigation.goBack()}>
				<Text>검색창으로 돌아가기</Text>
			</Pressable>
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

const styles = StyleSheet.create({
	mapBtm: {
		position: "absolute", 
		left: windowWidth/2 - 60, 
		bottom: "5%", 
		width: 140, 
		height: 35,
		zIndex: 100, 
		backgroundColor: "rgb(190, 235, 255)",
		borderRadius: 50,
		shadowRadius: 5,
		shadowColor: "black",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		elevation: 5,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	}
})