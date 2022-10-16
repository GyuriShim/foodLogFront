import React, {useContext} from "react"
import { ScrollView, Text, View, StyleSheet } from "react-native"
import EmptySearchResult from "../components/EmptySearchResult"
import UserSearchResult from "../components/UserSearchResult"
import SubSearchContext from "../contexts/SubSearchContext"

const SubSearch = ({navigation}) => {
	const {userKeyword} = useContext(SubSearchContext)

	if(userKeyword === ""){
		return <EmptySearchResult type="EMPTY_KEYWORD"/>
	}

	return(
		<UserSearchResult item={{profileUrl: null, username: userKeyword}} onPress={() => navigation.navigate("account")}/>
	)
}
const styles = StyleSheet.create({
	block: {}
})

export default SubSearch