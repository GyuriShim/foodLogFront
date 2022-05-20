import React from "react"
import styled from "styled-components/native"
import PropTypes from "prop-types"

const TRANSPARENT = "transparent"

const Container = styled.TouchableOpacity`
    background-color: ${({isFilled}) =>
		isFilled ? "rgba(165, 212, 233, 0.5)" : TRANSPARENT}
    align-items: center
    border-radius: 4px
    width: 45%
    padding: 10px
    opacity: ${({disabled}) => (disabled ? 0.5 : 1)}
`

const Title = styled.Text`
    height: 15px
    line-height: 15px
    font-size: 13px
    color: rgba(47, 93, 154, 1)
    font-weight : 700
`
const Button = ({containerStyle, title, onPress, isFilled, disabled}) => {
	return (
		<Container style={containerStyle} onPress={onPress} isFilled={isFilled} disabled={disabled}>
			<Title isFilled={isFilled}>{title}</Title>
		</Container>
	)
}

Button.defaulProps = {
	isFilled : true
}

Button.propTypes = {
	containerStyle : PropTypes.object,
	title : PropTypes.string,
	onPress : PropTypes.func.isRequired,
	isFilled: PropTypes.bool,
	disabled: PropTypes.bool
}

export default Button