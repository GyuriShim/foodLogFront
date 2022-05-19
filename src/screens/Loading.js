import React from "react"
import {View, Image, StatusBar, StyleSheet} from "react-native"

const Loading = () => {
	return(
		<>
			<StatusBar backgroundColor="rgba(190, 235, 255, 0.4)" barStyle="dark-content"/>
			<View style={styles.view}>
				<Image 
					source = {require("../assets/images/logo.png")}
					style={styles.image}
				/>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	view:{
		flex: 1,
		backgroundColor: "rgba(190, 235, 255, 0.4)",
		alignItems: "center",
		justifyContent: "center",
		paddingBottom: 300
	},
	image: {
		height: 127,
		width: 202,
	}
})

export default Loading