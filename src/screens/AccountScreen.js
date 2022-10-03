import React from "react"
import { View, StyleSheet, Image, Text, ScrollView, Pressable } from "react-native"
import styled from "styled-components"
import MapView from "react-native-maps"
import PropTypes from "prop-types"

const Container = styled.View`
	align-items: center
	background-color: white
	flex: 1
	padding-horizontal: 15px
	padding-top: 20px
	justify-content: space-around
`

const AccountScreen = ({navigation}) => {
	return(
		<>
			<Container>
				<View
					style={{width: "100%", height: "15%", paddingHorizontal: "3%", paddingTop: 10, justifyContent:"center"}}
				>
					<View
						style={{flexDirection: "row", justifyContent: "space-between",alignItems:"center", paddingBottom: 5}}
					>
						<Image style={styles.profile}/>
						<View
							style={{
								width: "70%", 
								height: "80%", 
								backgroundColor: "rgba(196, 196, 196, 0.22)", 
								borderRadius:5, 
								flexDirection: "row", 
								justifyContent:"space-evenly",
							}}
						>
							<Pressable style={{justifyContent: "center"}} onPress={() => navigation.navigate("follower")}>
								<Text style={{alignSelf: "center"}}>123</Text>
								<Text style={{alignSelf: "center"}}>팔로워</Text>
							</Pressable>
							<Pressable style={{justifyContent: "center"}} onPress={() => navigation.navigate("following")}>
								<Text style={{alignSelf: "center"}}>321</Text>
								<Text style={{alignSelf: "center"}}>팔로잉</Text>
							</Pressable>
							<Pressable style={{justifyContent: "center"}}>
								<Text>수정</Text>
							</Pressable>
						</View>
					</View>
					<View>
						<Text>@adnsf</Text>
						<ScrollView style ={{height: 40, marginBottom:10}}>
							<Text>dsfefeff</Text>
							<Text>fwfewg</Text>
						</ScrollView>
						
					</View>
				</View>
				<MapView
					style={{height: "74%", width: "100%"}}
					initialRegion={{
						latitude: 35.90, 
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

AccountScreen.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}).isRequired,
}

export default AccountScreen

const styles = StyleSheet.create({
	profile: {
		width: 81,
		height: 81,
		borderRadius: 50,
		backgroundColor: "#DEDEDE",
		alignItems: "center",
	}
})

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