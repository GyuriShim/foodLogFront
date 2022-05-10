import React from "react"
import {View, Text} from "react-native"

const App = () => {
	return(
		<View 
			style={{
				flex: 1,
				backgroundColor: "rgba(190, 235, 255, 0.4)",
				alignItems: "center",
				justifyContent: "center",
				
			}}>
			<Text
				style={{
					color: "#2f5d9a",
					fontSize: 48,
					fontWeight: "600",
					paddingBottom: 200,
				}}
			>
				Food{"\n"}Log</Text>
		</View>
	)
}

export default App