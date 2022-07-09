import React from "react"
import { Button } from "react-native"
import styled from "styled-components"
import MapView from "react-native-maps"

const Container = styled.View`
	align-items: center
	background-color: white
	flex: 1
	padding: 15px
`
const StyledText = styled.Text`
    font-size: 30px
    margin-bottom: 10px
`
const AccountScreen = () => {
	return(
		<>
			<Container>
				<MapView
					style={{height: "85%", width: "100%", borderRadius: 90}}
					initialRegion={{
						latitude: 35.95, 
						longitude: 127.5,
						latitudeDelta: 5,
						longitudeDelta: 5
					}}
					customMapStyle={mapStyle}
				>
				</MapView>
			</Container>
		</>
	)
}
export default AccountScreen

const mapStyle = [
	{
		"stylers": [
			{
				"lightness": 15
			}
		]
	},
	{
		"featureType": "road",
		"stylers": [
			{
				"visibility": "simplified"
			}
		]
	}
]