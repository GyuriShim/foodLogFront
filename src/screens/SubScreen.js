import React from "react"
import { Button, ScrollView, StatusBar, TextInput, Text } from "react-native"
import styled from "styled-components"
import Post from "../components/Post"

const Container = styled.View`
    align-items: center
    background-color: white
	padding: 0px 15px 15px 15px
`
const SubScreen = ({navigation}) => {
	return(
		<>
			<StatusBar backgroundColor="white" barStyle="dark-content"/>
			<Container>
				<TextInput 
					style={{
						height: 44,
						width: "100%", 
						borderColor: "rgba(165, 212, 233, 0.5)", 
						borderWidth: 5,
						borderRadius: 90,
						paddingLeft: 20
					}}
					placeholder="사용자 검색"
					onPressIn={() => navigation.navigate("subSearch")}
				/>
			</Container>
			<ScrollView style={{backgroundColor: "white", paddingHorizontal: 15}}>
				<Post onPress={() => navigation.navigate("account")}/>
				<Post/>
			</ScrollView>
		</>
	)
}
export default SubScreen
