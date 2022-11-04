import React, {useContext, useEffect, useState} from "react"
import { BackHandler, Dimensions, FlatList, StyleSheet, Text, View } from "react-native"
import Pressable from "react-native/Libraries/Components/Pressable/Pressable"
import EmptySearchResult from "../components/EmptySearchResult"
import SearchResult from "../components/SearchResult"
import SearchCategoryContext from "../contexts/SearchCategoryContext"
import SearchContext from "../contexts/SearchContext"
import { searchPlaceByAddress, searchPlaceByMenu, searchPlaceByName } from "../service/place"

const windowWidth = Dimensions.get("window").width

const SearchScreen = ({navigation}) => {
	const {keyword, onChangeText} = useContext(SearchContext)
	const {category} = useContext(SearchCategoryContext)
	const [loading, setLoading] = useState(false)
	const [result, setResult] = useState([])
	const fetchSearchList = async() => {
		try {
			setLoading(true)
			if (category===0) {
				const response = await searchPlaceByMenu(keyword)
				setResult(response.data.content)
			} else if (category===1) {
				const response = await searchPlaceByAddress(keyword)
				setResult(response.data.content)
				console.log(response.data)
			} else if (category===2) {
				const response = await searchPlaceByName(keyword)
				setResult(response.data.content)
				console.log("name ",response.data)
			}
		} catch (error) {
			console.log("catch error", error)
		}
		setLoading(false)
	}

	useEffect(() => {
		BackHandler.addEventListener(
			"hardwareBackPress",
			clear
		)
		return () => BackHandler.removeEventListener("hardwareBackPress", clear)
	},[])

	useEffect(() => {
		console.log(category)
		fetchSearchList()
	},[keyword])

	const clear = () => {
		onChangeText("")
		setResult([])
	}

	if(keyword === ""){
		return <EmptySearchResult type="EMPTY_KEYWORD"/>
	} else if(result.length === 0){
		return <EmptySearchResult type="NOT_FOUND"/>
	}

	return(
		<View style={{flex: 1}}>
			<FlatList
				data={result}
				renderItem={({item}) => (<SearchResult item={item} onPress={()=> navigation.navigate("MapSearchResult", {content: [item], coordinate: {latitude: item.latitude, longitude: item.longitude}})}/>)}
			/>
			{keyword && <Pressable style={styles.mapBtm} onPress={()=>navigation.navigate("MapSearchResult", {content: result, coordinate: {latitude: result[0].latitude, longitude: result[0].longitude}})}>
				<Text>지도에서 보기</Text>
			</Pressable>
			}
			
		</View>
	)
}

const styles = StyleSheet.create({
	mapBtm: {
		position: "absolute", 
		left: windowWidth/2 - 60, 
		bottom: "5%", 
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
	}
})
export default SearchScreen

