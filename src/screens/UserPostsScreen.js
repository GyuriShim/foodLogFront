import React, { useState } from "react"
import { View, Text, Pressable, Image, StyleSheet } from "react-native"
import { Location } from "../assets/icons/Location"
import UserPost from "../components/UserPost"

const UserPostsScreen = ({navigation}) => {
	
	return(
		<View style={{alignItems: "center", paddingHorizontal: 15, paddingBottom: 15}}>
			<UserPost item={{rating: 5, place:{name: "dddd", address: "경기도"}, pictures: "", review: "맛있다", date: "2022"}} onPress={() => {}}/>
		</View>
	)
}



export default UserPostsScreen