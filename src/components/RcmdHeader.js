import React, {useContext, useEffect, useState} from "react"
import {
	StyleSheet, 
	useWindowDimensions,
	View,
} from "react-native"
import { Picker } from "@react-native-picker/picker"
import PurposeContext from "../contexts/Purpose"

const RcmdHeader = () => {
	const width = useWindowDimensions().width
	const {value, setValue} = useContext(PurposeContext)

	return (
		<>
			<View style={[styles.block]}>
				<Picker
					selectedValue={value}
					style={{height: 50, width: width-30, borderWidth: 0}}
					onValueChange={(itemValue, itemIndex) => setValue(itemValue)}
					mode={"dropdown"}
				>
					<Picker.Item label="전체" value="null" fontFamily="SF-Pro-Text-Semibold"/>
					<Picker.Item label="혼밥하기 좋은 곳" value="SOLO" fontFamily="SF-Pro-Text-Semibold"/>
					<Picker.Item label="데이트하기 좋은 곳" value="COUPLE" fontFamily="SF-Pro-Text-Semibold"/>
					<Picker.Item label="친구랑 가기 좋은 곳" value="FRIEND" fontFamily="SF-Pro-Text-Semibold"/>
					<Picker.Item label="가족이랑 가기 좋은 곳" value="FAMILY" fontFamily="SF-Pro-Text-Semibold"/>
					<Picker.Item label="회식하기 좋은 곳" value="MEETING" fontFamily="SF-Pro-Text-Semibold"/>
					<Picker.Item label="기타" value="ETC" fontFamily="SF-Pro-Text-Semibold"/>
				</Picker>
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

export default RcmdHeader