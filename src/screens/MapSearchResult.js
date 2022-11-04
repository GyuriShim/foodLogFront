import React, { useContext, useEffect, useState } from "react"
import { Pressable, Text, StyleSheet, View, Dimensions, Animated, Modal, Image, ActivityIndicator } from "react-native"
import MapView from "react-native-maps"
import { OcticonsIcon } from "../assets/icons/OcticonsIcon"
import SearchContext from "../contexts/SearchContext"
import { getPlacePost } from "../service/map"


const windowWidth = Dimensions.get("window").width

const MapSearchResult = ({navigation, route}) => {
	const {keyword} = useContext(SearchContext)
	const [markers, setMarkers] = useState([{}])
	const [placePostId, setPlacePostId] = useState(0)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [subpostVisible, setSubpostVisible] = useState(false)
	const [placePost, setPlacePost] = useState({ contents: [], place: { address: "", name: "" } })

	useEffect(() => {
		console.log("route", route)
		setMarkers(route?.params?.content)
	},[])


	console.log(markers)
	useEffect(() => {
		const fetchPlacePost = async () => {
			try {
				setError(null)
				setLoading(true)
				if (placePostId != 0) {
					const response = await getPlacePost(placePostId)
					setPlacePost(response.data)
				}
			} catch (error) {
				console.log("placePost error" , error)
			}
		}
		fetchPlacePost()
	}, [placePostId])

	const getMarkerImage = (foodCategory) => {
		switch (foodCategory) {
		case ("한식"):
			return require("../assets/images/KOREAN.png")
		case ("중식"):
			return require("../assets/images/CHINESE.png")
		case ("양식"):
			return require("../assets/images/WESTERN.png")
		case ("일식"):
			return require("../assets/images/JAPANESE.png")
		case ("아시아음식"):
			return require("../assets/images/ASIAN.png")
		case ("치킨"):
			return require("../assets/images/CHICKEN.png")
		case ("카페"):
			return require("../assets/images/CAFE.png")
		case ("분식"):
			return require("../assets/images/SNACK.png")
		case ("간식"):
			return require("../assets/images/DESSERT.png")
		}
		return require("../assets/images/ETC.png")
	}

	/* if (coordinate == undefined) {
		return (
			<View style={{justifyContent:"center", alignItems:"center"}}>
				<ActivityIndicator size={32}></ActivityIndicator>
			</View>
		)
	} */
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
					latitude: route?.params?.coordinate.latitude, 
					longitude: route?.params?.coordinate.longitude,
					latitudeDelta: 0.005,
					longitudeDelta: 0.005
				}}
				customMapStyle={mapStyle}>
				{markers.map((marker, index) => {
					const coordinate = {
						latitude: marker.latitude,
						longitude: marker.longitude
					}
					return (
						<MapView.Marker key={index} coordinate={coordinate} onPress={() => { setPlacePostId(marker.placePostId), setSubpostVisible(!subpostVisible) }}>
							<Animated.View style={[styles.markerWrap]}>
								<Animated.Image
									source={getMarkerImage(marker.category)}
									style={[styles.marker,]}
									resizeMode="cover"
								/>
							</Animated.View>
						</MapView.Marker>
					)
				})}
			</MapView>
			<Modal
				transparent={true}
				visible={subpostVisible}
				onRequestClose={() => {
					setSubpostVisible(!subpostVisible)
				}}
			>
				<Pressable style={{flex:1, backgroundColor:"transparent",}} onPress={()=>setSubpostVisible(!subpostVisible)}/>
				<View style={styles.subPost}>
					<View style={{
						flexDirection: "row", 
						alignItems:"center", 
						justifyContent:"space-between", 
						paddingTop: 17,
						paddingRight: 16,
					}}>
						<Text numberOfLines={1} style={styles.storeName}>{placePost.place.name}</Text>
						<Pressable
							onPress={() => setSubpostVisible(!subpostVisible)}
						>
							<OcticonsIcon name="x" size={20} color="black"/>
						</Pressable>
                    
					</View>
                
					<View style={{flexDirection: "row", alignItems:"center"}}>
						<OcticonsIcon name="location" size={12} color="black"/>
						<Text numberOfLines={1} style={styles.storeAddress}>{placePost.place.address}</Text>
					</View>
                
					<Animated.ScrollView
						horizontal
						scrollEventThrottle={1}
						showsHorizontalScrollIndicator={true}
					>
						{placePost.contents.map((post, index) => {
							return (<Pressable style={styles.miniPost} key={index} onPress={() => navigation.navigate("PostScreen", { postId: post.postId })}>
								<Image
									source={{ uri: post.picture }}
									style={styles.postImage}
									resizeMode="cover"
								/>
								<Text numberOfLines={3} style={styles.review}>{post.review}</Text>
							</Pressable>)
						})}
					</Animated.ScrollView>
				</View>
			</Modal>
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
	},
	markerWrap: {
		alignItems: "center",
		justifyContent: "center",
		width: 50,
		height: 50
	},
	marker: {
		width: 29,
		height: 38,
	},
	subPost: {
		position:"absolute", bottom: 0,
		backgroundColor: "#ffffff",
		borderTopLeftRadius: 26,
		borderTopRightRadius: 26,
		height: 225,
		width: "100%",
		overflow: "hidden",
		shadowColor: "#ccc",
		paddingLeft: 16,
	},
	miniPost: {
		width: 120,
		height: "30%",
		paddingTop: 3
	},
	postImage: {
		width: 110,
		height: 110,
        
	},
	storeName: {
		fontSize: 15,
		color: "black"
	},
	storeAddress: {
		fontSize: 10,
		paddingLeft: 2,
		color: "black"
	},
	review: {
		fontSize: 10,
		width: 110,
		color: "black"
	},
})