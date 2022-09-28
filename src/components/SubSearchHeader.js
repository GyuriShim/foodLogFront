import React, {useContext, useState} from "react"
import {
	StyleSheet, 
	useWindowDimensions, 
	TextInput,
	Pressable,
	View,
	Text,
	TouchableOpacity,
	StatusBar
} from "react-native"
import { OcticonsIcon } from "../assets/icons/OcticonsIcon"
import SearchContext from "../contexts/SearchContext"

const SubSearchHeader = () => {
	const {width} = useWindowDimensions()
	const {keyword, onChangeText} = useContext(SearchContext)

	return (
		<>
			<View style={[styles.block, {width: width-32}]}>
				<View style={{flexDirection:"row", alignSelf: "flex-start", marginTop:5}}>
					<TextInput 
						returnKeyType="search"
						style={styles.input} 
						placeholder = "사용자 검색"
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
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	block: {
		flexDirection: "column",
		paddingBottom: 5
	},
	input: {
		flex:1,
		backgroundColor: "rgba(0, 0, 0, 0)",
		fontSize: 16,
		borderColor: "#D2E9F4",
		borderWidth: 3,
		borderRadius: 90,
		marginRight: 10,
		paddingLeft: 12,
		height: 44
	},
	button: {
		marginRight:60,
		marginTop: 10
	},
	btnText: {
		fontSize: 24,
		fontFamily: "Multicolore Pro",
	}

})

export default SubSearchHeader