import React, {useContext, useEffect, useState} from "react"
import { BackHandler, FlatList, StyleSheet, Text, View } from "react-native"
import EmptySearchResult from "../components/EmptySearchResult"
import SearchResult from "../components/SearchResult"
import SearchCategoryContext from "../contexts/SearchCategoryContext"
import SearchContext from "../contexts/SearchContext"
import { searchPlaceByAddress, searchPlaceByMenu, searchPlaceByName } from "../service/place"

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
	}

	return(
		<View style={{flex: 1}}>
			<FlatList
				data={result}
				renderItem={({item}) => (<SearchResult item={item}/>)}
			/>
		
		</View>
	)
}

const styles = StyleSheet.create({
	block: {}
})
export default SearchScreen
