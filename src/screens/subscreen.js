import React from "react"
import { Button, StatusBar } from "react-native"
import styled from "styled-components"

const Container = styled.View`
    align-items: center
    background-color: white
	flex: 1
`
const StyledText = styled.Text`
    font-size: 30px
    margin-bottom: 10px
`
const SubScreen = () => {
	return(
		<>
			<StatusBar backgroundColor="white" barStyle="dark-content"/>
			<Container>
				<StyledText>구독</StyledText>
				<Button title="hello anyang" style={{height: 20, width: 50}}/>
			</Container>
		</>
	)
}
export default SubScreen