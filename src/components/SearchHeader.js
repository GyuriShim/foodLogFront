import React, {useContext} from "react"
import {
	StyleSheet, 
	useWindowDimensions, 
	TextInput,
	Pressable,
	View
} from "react-native"
import { OcticonsIcon } from "../assets/icons/OcticonsIcon"
import SearchContext from "../contexts/SearchContext"

const SearchHeader = () => {
	const {width} = useWindowDimensions()
	const {keyword, onChangeText} = useContext(SearchContext)

	return (
		<View style={[styles.block, {width: width-32}]}>
			<TextInput 
				style={styles.input} 
				placeholder="메뉴, 음식점, 지역 검색"
				value={keyword}
				onChangeText={onChangeText} 
				autoFocus/>
			<Pressable
				style={({pressed}) => [styles.button, pressed && {opacity: 0.5}]}
				onPress={() => onChangeText("")}
                
			>
				<OcticonsIcon name="x" size={25} color="black"/>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	block: {
		flexDirection: "row",
		alignItems: "center",
	},
	input: {
		flex:1
	},
	button: {
		marginRight:60
	}

})

export default SearchHeader