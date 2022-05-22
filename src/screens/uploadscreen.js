import React from "react"
import { Button } from "react-native"
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
const UploadScreen = () => {
	return(
		<Container>
			<StyledText>업로드</StyledText>
			<Button title="hello anyang" style={{height: 20, width: 50}}/>
		</Container>
	)
}
export default UploadScreen