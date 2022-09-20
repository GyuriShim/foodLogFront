import React, {useState, useEffect,} from "react"
import styled from "styled-components"
import MapView from "react-native-maps"
import { TextInput, TouchableOpacity } from "react-native-gesture-handler"
import { FontIcon } from "../assets/icons/Fontisto"
import {Text, View, Platform, PermissionsAndroid, Image, StyleSheet, Animated, Pressable, Modal} from "react-native"
import Geolocation from "react-native-geolocation-service"
import PropTypes from "prop-types"
import { markers } from "../model/mapData"
import { OcticonsIcon } from "../assets/icons/OcticonsIcon"

const Container = styled.View`
	background-color: white
	flex: 1
	padding: 15px
`

const requestPermission = async() => {
	try {
		if (Platform.OS == "android"){
			return await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
			)
		}
	} catch(e){
		console.log(e)
	}
}

/* const searchData = async(text) => {
	try{
		const res = await axios({
			url:,
			method: "POST",
			data: {
				searchKeyword: text
			}
		})
		const resJson = await res.json()
		const newResJson = resJson
		setData(newResJson)
	} catch(e){
		console.log("axios 실패")
	}
} */

const MapScreen = ({navigation}) => {
	const initialMapState = {
		markers,
	}

	const [state, setState] = useState(initialMapState)
	const [location, setLocation] = useState()
	const [subpostVisible, setSubpostVisible] = useState(false)
	const [filterVisible, setFilterVisible] = useState(false)

	useEffect(() => {
		let isComponentMounted = true
		requestPermission().then(result =>{
			console.log({result})
			if (result === "granted"){
				Geolocation.getCurrentPosition(
					position => {
						setLocation(position.coords)
						if (isComponentMounted){
							setLocation(position.coords)
						}
						
					},
					error => {
						console.log(error.code, error.message)
					},
					{
						enableHighAccuracy: true, 
						timeout: 15000, 
						maximumAge: 10000
					}
				)
			}
		})
		return () => {
			isComponentMounted = false
		}
	},[])

	if(!location){
		return (
			<View>
				<Text>Splash Screen</Text>
			</View>
		)
	}

	return(
		<Container>
			<TextInput 
				style={{
					height: 44,
					width: "100%", 
					borderColor: "rgba(165, 212, 233, 0.5)", 
					borderWidth: 5,
					borderRadius: 90,
					paddingLeft: 20
				}}
				placeholder="메뉴, 음식점, 지역 검색"
				onPressIn={() => navigation.navigate("search")}
			/>
			<TouchableOpacity onPress={() => setFilterVisible(!filterVisible)} style={{
				flexDirection: "row",
				alignContent: "flex-start",
				alignItems: "center",
				marginLeft: "5%", 
				paddingVertical:7,}}
			>
				<Pressable style={{marginRight: 3}}>
					<FontIcon name="equalizer" size={34} color="rgb(47, 93, 154)"/>
				</Pressable>
				<Text style={{fontSize: 14,color:"rgb(47, 93, 154)", fontFamily:"Arial", fontWeight: "700"}}>Filter</Text>
			</TouchableOpacity>
			<MapView
				style={{height: "85%", width: "100%", borderRadius: 90}}
				initialRegion={{
					latitude: location.latitude,
					longitude: location.longitude,
					latitudeDelta: 0.005,
					longitudeDelta: 0.005
				}}
				showsUserLocation={true}
				showsMyLocationButton={true}
				customMapStyle={mapStyle}
			>
				{state.markers.map((marker, index) => {
					return (
						<MapView.Marker key={index} coordinate={marker.coordinate} onPress={() => setSubpostVisible(!subpostVisible)}>
							<Animated.View style={[styles.markerWrap]}>
								<Animated.Image
									source={require("../assets/images/marker.png")}
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
						<Text numberOfLines={1} style={styles.storeName}>햄버거</Text>
						<Pressable
							onPress={() => setSubpostVisible(!subpostVisible)}
						>
							<OcticonsIcon name="x" size={20} color="black"/>
						</Pressable>
					
					</View>
				
					<View style={{flexDirection: "row", alignItems:"center"}}>
						<OcticonsIcon name="location" size={12} color="black"/>
						<Text numberOfLines={1} style={styles.storeAddress}>경기도</Text>
					</View>
				
					<Animated.ScrollView
						horizontal
						scrollEventThrottle={1}
						showsHorizontalScrollIndicator={true}
					>
						{state.markers.map((marker, index) => (
							<View style={styles.miniPost} key={index}>
								<Image
									source={marker.image}
									style={styles.postImage}
									resizeMode="cover"
								/>
								<Text numberOfLines={3} style={styles.review}>{marker.address}</Text>
							</View>
						))}
					</Animated.ScrollView>
				</View>
			</Modal>
			<Modal
				transparent={true}
				visible={filterVisible}
				onRequestClose={() => {
					setFilterVisible(!filterVisible)
				}}
			>
				<Pressable style={{flex:1, backgroundColor:"transparent",}} onPress={()=>setFilterVisible(!filterVisible)}/>
				<View style={styles.filter}>
					
				</View>
			</Modal>
			
			
			
		</Container>
	)
}

MapScreen.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}).isRequired,
}
export default MapScreen

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
		position:"absolute", bottom: 58,
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
	filter: {
		height: "70%", 
		width: "100%", 
		backgroundColor: "#fff", 
		position:"absolute", 
		bottom: 58, 
		borderTopLeftRadius:26, 
		borderTopRightRadius: 26,
	}

})
