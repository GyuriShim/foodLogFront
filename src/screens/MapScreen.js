import React, {useState, useEffect, useRef, useContext} from "react"
import styled from "styled-components"
import MapView from "react-native-maps"
import { TextInput, TouchableOpacity } from "react-native-gesture-handler"
import { FontIcon } from "../assets/icons/Fontisto"
import {Text, View, Platform, PermissionsAndroid, Image, StyleSheet, Animated, Pressable, Modal, Alert, useWindowDimensions, Dimensions} from "react-native"
import Geolocation from "react-native-geolocation-service"
import PropTypes from "prop-types"
import { OcticonsIcon } from "../assets/icons/OcticonsIcon"
import { TagSelect } from "react-native-tag-select"
import { getMap, getPlacePost } from "../service/map"
import Button from "../components/Button"
import { AntIcon } from "../assets/icons/AntIcon"
import TagSelectExtension from "react-native-tag-select/src/TagSelectExtension"
import { ProgressContext } from "../contexts/Progress"
import { ActivityIndicator } from "react-native-paper"


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

const windowWidth = Dimensions.get("window").width

const MapScreen = ({ navigation }) => {
	const [state, setState] = useState({})
	const [location, setLocation] = useState()
	const [isLocation, setIsLocation] = useState(false)
	const [subpostVisible, setSubpostVisible] = useState(false)
	const [filterVisible, setFilterVisible] = useState(false)
	const [markers, setMarkers] = useState([])
	const [placePostId, setPlacePostId] = useState(0)
	const [placePost, setPlacePost] = useState({ contents: [], place: { address: "", name: "" } })
	const [rating, setRating] = useState({id : "all", label: "전체"})
	const [purpose, setPurpose] = useState([])
	const [category, setCategory] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [activate, setActivate] = useState(false)
	const {spinner} = useContext(ProgressContext)

	const getMapLocation = (region) => {
		let longitudeDelta = region.longitudeDelta
		let latitudeDelta = region.latitudeDelta
		let latitude =  region.latitude
		let longitude = region.longitude
		setLocation({
			longitudeDelta: longitudeDelta,
			latitudeDelta: latitudeDelta,
			latitude: latitude,
			longitude: longitude
		})
		console.log("update location", location)
	}

	const ratingRef = useRef()
	const purposeRef = useRef()
	const categoryRef = useRef()
    
	const ratingList = [
		{id : "all", label: "전체"},
		{id : 3, label: "3.0"},
		{id : 3.5, label: "3.5"},
		{id : 4, label: "4.0"},
		{id : 4.5, label: "4.5"}
	]

	const purposeList = [
		{id : "SOLO", label: "혼밥"},
		{id : "COUPLE", label: "데이트"},
		{id : "FRIEND", label: "친구"},
		{id : "FAMILY", label: "가족"},
		{id : "MEETING", label: "회식"},
		{id : "ETC", label: "기타"},
	]

	const categoryList = [
		{id : "WESTERN", label: "양식"},
		{id : "CHINESE", label: "중식"},
		{id : "JAPANESE", label: "일식"},
		{id : "KOREAN", label: "한식"},
		{id : "SNACK", label: "분식"},
		{id : "ASIAN", label: "아시안"},
		{id : "CHICKEN", label: "치킨"},
		{id : "DESSERT", label: "디저트"},
		{id : "CAFE", label: "카페"},
		{id : "ECT", label: "기타"},
	]

	console.log("this is rating, purpose, category" , rating, purpose, category)

	const getPlaces = async () => {
		setIsLocation(!isLocation)
	}

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

	const fetchMap = async () => {      
		try {
			setError(null)
			spinner.start()
			const mapRequest = {
				latitude: location.latitude,
				longitude: location.longitude,
				latitudeDelta: location.latitudeDelta,
				longitudeDelta: location.longitudeDelta,
				purposeList: purpose.map((value) => getValue(value)),
				categoryList: category.map((value) => getValue(value)),
				rating: isNaN(rating)? null : rating
			}
			const response = await getMap(mapRequest)
			console.log("response", response.data)
			setMarkers(response.data)
		} catch (e) {
			setError(e)
			console.log("catch error", e)
		} finally {
			spinner.stop()
		}
	}

	useEffect(() => {
		fetchMap()
	}, [isLocation])

	useEffect(() => {
		let isComponentMounted = true
		requestPermission().then(result =>{
			if (result === "granted"){

				Geolocation.getCurrentPosition(
					position => {
						if (isComponentMounted){
							setLocation({
								latitude: position.coords.latitude,
								longitude: position.coords.longitude,
								latitudeDelta: 0.1,
								longitudeDelta: 0.1
							})
							setIsLocation(!isLocation)
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
		spinner.stop()
		return () => {
			isComponentMounted = false
		}   
	} , [])

	const getValue = (value) => {
		if (value != "") {
			return value.id
		}
		return null
	}

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

	if (!location) {
		return (
			<View style={{justifyContent:"center", alignItems:"center"}}>
				<ActivityIndicator size={32}></ActivityIndicator>
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
				style={{ height: "85%", width: "100%", borderRadius: 90 }}
				initialRegion={{
					latitude: location.latitude,
					longitude: location.longitude,
					latitudeDelta: 0.005,
					longitudeDelta: 0.005
				}}
				showsUserLocation={true}
				showsMyLocationButton={true}
				customMapStyle={mapStyle}
				onRegionChangeComplete={region => {getMapLocation(region), setActivate(true)}}
				maxZoomLevel = {18}
			>
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
			<Modal
				transparent={true}
				visible={filterVisible}
				onRequestClose={() => {
					setFilterVisible(!filterVisible)
				}}
			>
				<Pressable style={{flex:1, backgroundColor:"transparent",}} onPress={()=>setFilterVisible(!filterVisible)}/>
				<View style={styles.filter}>
					<Text style={styles.title}>최소 평점</Text>
					<View style={{ paddingHorizontal: 20 }}>
                        
						<TagSelectExtension
							value={[rating]}
							ref={ratingRef}
							onItemPress={(item) => {
								setState(state.item = item)
							}}
							data={ratingList}
							itemStyle={styles.item}
							itemStyleSelected={styles.itemSelected}
							itemLabelStyleSelected={styles.labelSelected}
						/>
					</View>
					<Text style={styles.title}>목적</Text>
					<View style={{paddingHorizontal: 20}}>
						<TagSelect
							value={purpose}
							data={purposeList}
							ref={purposeRef}
							itemStyle={styles.item}
							itemStyleSelected={styles.itemSelected}
							itemLabelStyleSelected={styles.labelSelected}
						/>
					</View>
					<Text style={styles.title}>음식 종류</Text>
					<View style={{paddingHorizontal: 20}}>
						<TagSelect
							value={category}
							data={categoryList}
							ref={categoryRef}
							itemStyle={styles.item}
							itemStyleSelected={styles.itemSelected}
							itemLabelStyleSelected={styles.labelSelected}
						/>
					</View>
					<View style={{flexDirection: "row", justifyContent: "space-evenly", marginTop: 10}}>
						<Button
							title="취소"
							containerStyle={{width: "40%"}}
							onPress={() => setFilterVisible(!filterVisible)}
						/>
						<Button
							title="적용"
							containerStyle={{width: "40%"}}
							onPress={() => {
								const selectedRating = ratingRef.current.itemsSelected[0].id
								if (selectedRating != undefined) {
									setRating(selectedRating)
								}
								const selectedPurpose = purposeRef.current.itemsSelected.filter(value => value != "")
								setPurpose(selectedPurpose)
								const selectedCategory = categoryRef.current.itemsSelected.filter(value => value != "")
								setCategory(selectedCategory)
								getPlaces()
								setFilterVisible(!filterVisible)
							}}
						/>
                        
					</View>
				</View>
			</Modal>
			<Pressable
				onPress={()=>{getPlaces(), setActivate(false)}}
				style={activate? styles.activateBtn: styles.inactiveBtn}>
				<AntIcon name="reload1" size={15}/>
				<Text> 결과 새로고침</Text>
			</Pressable>
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
		height: "80%", 
		width: "100%", 
		backgroundColor: "#fff", 
		position:"absolute", 
		bottom: 58, 
		borderTopLeftRadius:26, 
		borderTopRightRadius: 26,
	},
	item: {
		marginTop: 5,
		backgroundColor: "rgba(196, 196, 196, 0.45)",
		width: 70,
		alignItems: "center"
	},
	itemSelected: {
		backgroundColor:"rgba(157, 225, 255, 0.4)"
	},
	labelSelected: {
		color: "black"
	},
	title: {
		fontSize: 16,
		paddingHorizontal: 20,
		paddingTop: 15,
		fontWeight: "600",
		color: "black"
	},
	activateBtn: {
		position: "absolute", 
		left: windowWidth/2 - 60, 
		top: "19%", 
		width: 120, 
		height: 30,
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
	inactiveBtn: {
		position: "absolute", 
		left: windowWidth/2 - 60, 
		top: "19%", 
		width: 120, 
		height: 30,
		zIndex: 100, 
		backgroundColor: "white",
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
