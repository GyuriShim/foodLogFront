import React from "react"
import {StatusBar, View, Text, StyleSheet} from "react-native"
 
const AddInfo = () => {
	return (
		<>
			<StatusBar backgroundColor="#ffffff" barStyle="dark-content"/>
			<View style={styles.view}>
				<Text style={styles.text}>
                    JOIN
				</Text>
				<Text>
                    프로필 등록
				</Text>
			</View>
			<View>

			</View>
		</>
	)
}

const styles = StyleSheet.create({
	view: {
		flex:1,
		alignItems: "flex-start",
		justifyContent: "center",
		paddingLeft: 30
	},
	text: {
		fontSize:24, 
		fontFamily: "Multicolore Pro", 
		color: "#2F5D9A"
	}
})
export default AddInfo