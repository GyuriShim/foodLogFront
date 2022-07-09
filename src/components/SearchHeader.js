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

const SearchHeader = () => {
	const {width} = useWindowDimensions()
	const {keyword, onChangeText} = useContext(SearchContext)
	const [working, setWorking] = useState(0)
	const menu = () => {setWorking(0), onChangeText("")}
	const region = () => {setWorking(1), onChangeText("")}
	const store = () => {setWorking(2), onChangeText("")}

	return (
		<>
			<StatusBar backgroundColor="rgba(190, 235, 255, 0.6)" barStyle="dark-content"/>
			<View style={[styles.block, {width: width-32}]}>
				<View style={{flexDirection:"row", justifyContent:"space-between", marginRight: 60}}>
					<TouchableOpacity onPress={menu}>
						<Text style={{
							...styles.btnText, 
							color: working===0 ? "rgb(47, 93, 154)" : "rgba(47, 93, 154, 0.4)"
						}}>
							메뉴
						</Text>
					</TouchableOpacity>
					
					<TouchableOpacity onPress={region}>
						<Text style={{
							...styles.btnText, 
							color: working===1 ? "rgb(47, 93, 154)" : "rgba(47, 93, 154, 0.4)"
						}}>
							지역
						</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={store}>
						<Text style={{
							...styles.btnText, 
							color: working===2 ? "rgb(47, 93, 154)" : "rgba(47, 93, 154, 0.4)"
						}}>
							가게
						</Text>
					</TouchableOpacity>
				</View>
				<View style={{flexDirection:"row", alignSelf: "center", marginTop:5}}>
					<TextInput 
						returnKeyType="search"
						style={styles.input} 
						placeholder = {working===0 ? "메뉴를 검색하세요" : (working===1 ? "지역를 검색하세요":"가게를 검색하세요")}
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
		//alignItems: "center",
	},
	input: {
		flex:1,
		backgroundColor: "rgba(0, 0, 0, 0)",
		fontSize: 16
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

export default SearchHeader