import React from "react"
import { Button, ScrollView } from "react-native"
import styled from "styled-components"
import RcmdPost from "../components/RcmdPost"

const Container = styled.View`
    align-items: center
    background-color: white
	padding-horizontal: 15px
`
const StyledText = styled.Text`
    font-size: 30px
    margin-bottom: 10px
`
const RcmdScreen = ({navigation}) => {
	return(
		<>
			<Container>
			</Container>	
			<ScrollView style={{paddingHorizontal: 15, backgroundColor: "white"}}>
				<RcmdPost onPress={() => navigation.navigate("PostScreen")} item={{imageUrl: null, store:"퍼미닛 커피", address:"경기도 성남시", contents:"어쩌구", rating: 5}}/>
			</ScrollView>
		</>
		
	)
}
export default RcmdScreen
