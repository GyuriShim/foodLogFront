import React, {useState, forwardRef} from "react"
import styled from "styled-components/native"
import PropTypes from "prop-types"

const Container = styled.View`
    flex-direaction: column
    width: 100%
    margin: 10px 0
`
const StyledTextInput = styled.TextInput`
    background-color: white
    padding: 8px 10px
    font-size: 13px
	font-family: Arial
    border: 4px solid 
        ${({isFocused}) => (isFocused? "rgb(164, 212, 234)" : "rgba(164, 212, 234, 0.6)")}
    border-radius: 4px
	height: ${(props) => props.height}
	multiline: ${(props) => props.multiline}
`
const Input = forwardRef(
	(
		{
			height,
			value,
			onChangeText,
			onSubmitEditing,
			onBlur,
			placeholder,
			returnKeyType,
			maxLength,
			multiline,
		},
		ref
	) => {
		const [isFocused, setIsFocused] = useState(false)

		return(
			<Container>
				<StyledTextInput
					ref={ref}
					height={height}
					isFocused={isFocused}
					value={value}
					onChangeText={onChangeText}
					onSubmitEditing={onSubmitEditing}
					onFocus={() => setIsFocused(true)}
					onBlur={() => {
						setIsFocused(false)
						onBlur()
					}}
					placeholder={placeholder}
					returnKeyType={returnKeyType}
					maxLength={maxLength}
					autoCapitalize="none"
					autoCorrect={false}
					underlineColorAndroid="transparent"
					multiline={multiline}
				/>
			</Container>
		)
	}
)

Input.displayName = "Input"
Input.defaultProps = {
	onBlur: () => {}
}

Input.propTypes = {
	height: PropTypes.number,
	value: PropTypes.string.isRequired,
	onChangeText: PropTypes.func.isRequired,
	onSubmitEditing: PropTypes.func.isRequired,
	onBlur: PropTypes.func,
	placeholder: PropTypes.string,
	returnKeyType: PropTypes.oneOf(["done", "next"]),
	maxLength: PropTypes.number,
	multiline: PropTypes.bool,
}

export default Input