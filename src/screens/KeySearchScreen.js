import React, {useContext, useState, useEffect} from "react"
import { ScrollView, TextInput, StyleSheet, Text, View , PermissionsAndroid, Platform, Button, FlatList} from "react-native"
import axios from "axios"
//import UploadScreen from "../screens/UploadScreen"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import styled from "styled-components"
//import EmptySearchResult from "../components/EmptySearchResult"
//import SearchResult from "../components/SearchResult"
//import SearchContext from "../contexts/SearchContext"
//import KeySearchHeader from "../components/KeySearchHeader"
import Geolocation from "react-native-geolocation-service"
import Icon from "react-native-vector-icons/MaterialIcons"
//import Pressable from "react-native/Libraries/Components/Pressable/Pressable"
import { TouchableOpacity } from "react-native-gesture-handler"




const Container = styled.View` 
  flex: 1
  background-color: white //배경
`
const Box5= styled.View`
  flex: 1
  border-radius: 7px
  margin: 5px 10px
  background-color: white
  border: 2px rgba(164, 212, 234, 0.8)
` 
const styles = StyleSheet.create({
	block: {},
	Box2:{
		flex:0,
		margin: 10,
		borderRadius: 7,
		borderWidth: 2,
		backgroundcolor: "white",
		borderColor: "#a4d3ea",
		flexDirection: "row",
		backgroundColor: "white",
		alignContent: "center",
		alignItems: "center",
		paddingLeft: 5,
	},
})
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

function KeySearchScreen (data) {
	const [coordinate, setCoordinate] = useState({latitude: 37.5666805, longitude: 126.9784147})
	const [res, setRes]= useState(null)
	const [place, setPlace] = useState("")
	const [input, setInput] = useState("")

	useEffect(() => {
		let isComponentMounted = true
		requestPermission().then(result =>{
			console.log({result})
			if (result === "granted"){
				Geolocation.getCurrentPosition(
					position => {
						const {latitude, longitude} = (position.coords)
						setCoordinate({
							latitude,
							longitude
						})
						if (isComponentMounted){
							const {latitude, longitude} = (position.coords)
							setCoordinate({
								latitude,
								longitude
							})
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

	if(!coordinate){
		return (
			<View>
				<Text>Splash Screen</Text>
			</View>
		)
	}
	const placeSearch = async() => {
		try{
			//const data = {query : input}
			await axios({
				method : "GET",
				url: `https://dapi.kakao.com/v2/local/search/keyword.json?page=1&size=10&query=백소정&x=${coordinate.longitude}&y=${coordinate.latitude}&input_coord=WGS84`,//json형태
				headers : {
					"Authorization": "KakaoAK a5511114012c0013be3072d88f677c4c"}
			}
			).then((res) => 
			{
				console.log(res.data.documents[0])
				//place = res.get(url, headers = headers).json()["documents"]
				//res.json())
				//.then(json => {
				// 받은 json으로 기능 구현
				setPlace(res.data.documents[0])
				const placeName = setPlace.place_name
				console.log(placeName)
			})
		}catch (error) {
			console.log(error)
		}
	}
	const onChange = (res) => {
		setInput(res.placeName)
	}
	const handleSubmit = (res) => {
		res.preventDefault()
		setPlace(input)
		setInput("")
	}
	const renderItem = ({item}) => {
		return (
			<View style={{flexDirection: "row", padding: 7, width: "100%", justifyContent:"space-between", borderBottomColor: "rgba(165, 212, 233, 0.5)", borderBottomWidth: 2, alignItems:"center"}}>
				<View style={{flexDirection: "row", alignItems: "center"}}>
					<View style={{flexDirection: "column"}}>
						<Text style={{fontWeight: "bold"}}>{item.placeName}</Text>
					</View>
				</View>				
			</View>
		)
	}
	

	return(
		<KeyboardAwareScrollView contentContainerStyle={{flex:1, backgroundColor:"white"}}>
			<Container >
				<View style = {styles.Box2}>
					<TextInput
						style = {{flex:1}}
						multiline = {false}
						placeholder = "상호명을입력하세요"
						textAlignVertical="center"
						onChangeText={text => setInput(placeSearch(data))}
						value={data}
					> 
					</TextInput>
					<TouchableOpacity style = {{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
						<Icon name="search" size={30} onPress={()=>{placeSearch(data)}}/>
					</TouchableOpacity>
				</View>
				<Box5>
					<View>
						<FlatList>
							data={renderItem}
						</FlatList>
					</View>
					{/* <FlatList>
					data={placeName}
					renderItem={renderItem}
					</FlatList> */}
				</Box5>
			</Container>
		</KeyboardAwareScrollView>
	)
    
}
export default KeySearchScreen