import React, {useContext, useState, useEffect, useRef} from "react"
import { ScrollView, TextInput, StyleSheet, Text, View , PermissionsAndroid, Platform, Button, FlatList,ActivityIndicator} from "react-native"
import axios from "axios"
import UploadScreen from "../screens/UploadScreen"
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
import { SafeAreaView } from "react-native-safe-area-context"




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
	block: {
		flex:1
	},
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
	Box5:{
		flex:0,
		margin: 10,
		borderRadius: 7,
		borderWidth: 2,
		backgroundcolor: "white",
		borderColor: "white",
		flexDirection: "row",
		backgroundColor: "white",
		justifyContent: "space-between",
		alignItems: "center",
		paddingLeft: 5,
	},
	iconContainer : {
		flex:0,
		backgroundColor : "#e7e7e7",
		padding : 7,
		borderRadius : 10,
		marginRight : 15,
	},
	locationText : {
		flex:1,
        
	},
	row : {
		flex: 1,
		flexDirection : "row",
		alignItems : "center",
		justifyContent: "space-between",
		paddingVertical : 15,
		borderBottomWidth : 1,
		borderColor : "#a4d3ea",
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

function KeySearchScreen ({navigation}) {
	const [coordinate, setCoordinate] = useState({latitude: 37.5666805, longitude: 126.9784147})
	const [res, setRes]= useState(null)
	const [placeObj, setPlaceObj] = useState({})
	const [input, setInput] = useState(inputText)
	//const [data, setData] = useState()
	const [place, setPlace] = useState()
	const [inputText, setInputText] = useState("")

	

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
				//setData({data})
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
			await axios({
				url : `https://dapi.kakao.com/v2/local/search/keyword.json?query=${inputText}&size=10&&x=${coordinate.longitude}&y=${coordinate.latitude}&input_coord=WGS84`,
				method : "GET",
				//data: {query: "해피덮"},
				headers : ({
					"Authorization": "KakaoAK a5511114012c0013be3072d88f677c4c",
				}),
			}).then((response) =>
			{
				
				console.log(response.data.documents)
				setPlace(response.data.documents)
				setPlaceObj({
					name: place.place_name
				})
				//res.json())
				//.then((resData) => {
				//const data = res.query.documents[0]
				//console.log(res.query.documents[0])
				
			})
			//console.log(place.place_name)
			console.log(place)
		} catch (error) {
			console.log(error.message)
		} 
	}
				
	//place = res.get(url, headers = headers).json()["documents"]
	//res.json())
	// 받은 json으로 기능 구현
	//setPlace(res.data.documents[0])
	//const placeName = setPlace.place_name
	//console.log(placeName)
	
	
	/* const onChange = (res) => {
		setInput(res.placeName)
	}
	const handleSubmit = (res) => {
		res.preventDefault()
		setPlace(input)
		setInput("")
	} */
	const renderItem = () => {
		//console.log(input)
		return (
			<View style={{flexDirection: "row", padding: 7, width: "100%", justifyContent:"space-between", borderBottomColor: "rgba(165, 212, 233, 0.5)", borderBottomWidth: 2, alignItems:"center"}}>
				<View style={{flexDirection: "row", alignItems: "center"}}>
					<View style={{flexDirection: "column"}}>
						<Text style={{fontWeight: "bold"}}
							source = {place}></Text>
					</View>
				</View>				
			</View>
		)
	} 

	
	

	return(
		<View contentContainerStyle={{flex:1,backgroundColor:"white"}}> 
			<View style = {styles.Box2}>
				<TextInput
					returnKeyType="search"
					style = {{flex:1}}
					multiline = {false}
					placeholder = "상호명을입력하세요"
					textAlignVertical="center"
					value={inputText}
					onChangeText= {setInputText}
					//this.setPlace({setInputText})}
					autoFocus
				> 
				</TextInput>
				<TouchableOpacity style = {{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
					<Icon name="search" size={30} onPress={()=>{placeSearch(res)}}/>
				</TouchableOpacity>
			</View>
			<View style = {styles.Box5}>
				{/* <Text>{placeObj.name}</Text> */}
				<FlatList
					data = {place}
					renderItem = {({item}) => 
						<View style = {styles.row}>
							<TouchableOpacity style = {{flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
								onPress = {()=> {navigation.navigate("UploadScreen"),setPlace(item)}}>

								<Text>{item.place_name}{"\n"}
									{item.address_name}
								</Text>
							</TouchableOpacity>
							
							<TouchableOpacity style = {{flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
								<Text>{item.category_group_name}</Text>
							</TouchableOpacity>
							
						</View>
					}
				/>
			</View>
		</View>
	)

    
}
export default KeySearchScreen