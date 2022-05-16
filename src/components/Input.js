import React, {useState, forwardRef} from "react"
import styled from "styled-components/native"
import PropTypes from "prop-types"

const Container = styled.View`
    flex-direaction: column
    width: 90%
    margin: 10px 0
`
const StyledTextInput = styled.TextInput`
    placeholderTextColor: #C4C4C4
    background-color: white
    padding: 8px 10px
    font-size: 13px
    border: 4px solid 
        ${({isFocused}) => (isFocused? "rgb(164, 212, 234)" : "rgba(164, 212, 234, 0.6)")}
    border-radius: 4px 
`
const Input = forwardRef(
	(
		{
			value,
			onChangeText,
			onSubmitEditing,
			onBlur,
			placeholder,
			returnKeyType,
			maxLength,
		},
		ref
	) => {
		const [isFocused, setIsFocused] = useState(false)

		return(
			<Container>
				<StyledTextInput
					ref={ref}
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
	value: PropTypes.string.isRequired,
	onChangeText: PropTypes.func.isRequired,
	onSubmitEditing: PropTypes.func.isRequired,
	onBlur: PropTypes.func,
	placeholder: PropTypes.string,
	returnKeyType: PropTypes.oneOf(["done", "next"]),
	maxLength: PropTypes.number
}

export default Input