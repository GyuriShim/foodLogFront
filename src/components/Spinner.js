import React, { useContext } from "react"
import { ActivityIndicator } from "react-native"
import styled, { ThemeContext } from "styled-components"

const Container = styled.View`
    position: absolute
    z-index: 2
    opacity: 0.6
    width: 100%
    height: 100%
    justify-content: center
    background-color: #000000
`

const Spinner = () => {
	const theme = useContext(ThemeContext)
	return(
		<Container>
			<ActivityIndicator size={32} color="rgb(216, 243, 255)" />
		</Container>
	)
}

export default Spinner