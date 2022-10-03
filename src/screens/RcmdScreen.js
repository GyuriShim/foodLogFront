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
const RcmdScreen = () => {
	return(
		<>
			<Container>
			</Container>	
			<ScrollView style={{paddingHorizontal: 15, backgroundColor: "white"}}>
				<RcmdPost/>
				<RcmdPost/>
			</ScrollView>
		</>
		
	)
}
export default RcmdScreen
