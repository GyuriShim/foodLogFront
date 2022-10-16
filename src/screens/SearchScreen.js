import React, {useContext} from "react"
import { StyleSheet, Text, View } from "react-native"
import EmptySearchResult from "../components/EmptySearchResult"
import SearchResult from "../components/SearchResult"
import SearchContext from "../contexts/SearchContext"

const SearchScreen = ({navigation}) => {
	const {keyword} = useContext(SearchContext)

	if(keyword === ""){
		return <EmptySearchResult type="EMPTY_KEYWORD"/>
	}

	return(
		<SearchResult item={{store: keyword, address: "주소"}}/>
	)
}

const styles = StyleSheet.create({
	block: {}
})
export default SearchScreen
