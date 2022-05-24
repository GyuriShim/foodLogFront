import React from "react"
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
const MapScreen = () => {
	return(
		<Container>
			<StyledText>mapscreen</StyledText>
		</Container>
	)
}
export default MapScreen
