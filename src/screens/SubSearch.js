import React, {useContext} from "react"
import { ScrollView, Text, View, StyleSheet } from "react-native"
import EmptySearchResult from "../components/EmptySearchResult"
import SubSearchContext from "../contexts/SubSearchContext"

const SubSearch = ({navigation}) => {
	const {userKeyword} = useContext(SubSearchContext)

	if(userKeyword === ""){
		return <EmptySearchResult type="EMPTY_KEYWORD"/>
	}

	return(
		<View style={styles.block}>
			<Text>{userKeyword}</Text>
		</View>
	)
}
const styles = StyleSheet.create({
	block: {}
})

export default SubSearch