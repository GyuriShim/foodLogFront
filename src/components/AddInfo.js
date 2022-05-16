import React, {useState, useRef, useEffect} from "react"
import {StatusBar, View, Text, StyleSheet, TouchableOpacity} from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Icon from "react-native-vector-icons/Ionicons"
import Input from "./Input"
import styled from "styled-components/native"

const ErrorText = styled.Text`
    align-items: flex-start
    width: 100%
    height: 13px
    line-height: 15.51px
    margin-top: 4
    margin-bottom: 7
    margin-left: 5
    font-family: SF Pro Text
    font-style: normal
    color: red
`

const AddInfo = () => {
	const [username, setUsername] = useState("")
	const [selfBio, setSelfBio] = useState("")
	const [errorMessage, sestErrorMessage] = useState("")
	//const [disabled, setDisabled] = useState(true)
	//생일, 성별 추가해야함

	const usernameRef = useRef()
	const selfBioRef = useRef()

	useEffect(() => {
		let _errorMessage = ""
		if (!username){
			_errorMessage = "아이디를 입력해주세요."
		} else if (username.length > 11) {
			_errorMessage = "10자 이내로 입력해주세요."
		} else {
			_errorMessage = ""
		}
		sestErrorMessage(_errorMessage)
	}, [username])
	//유효성 관련 에러메시지도 추가해야함
	//사용가능하다는것도 해야하눼
	//중복도
	//에러메시지 인풋 별로 분리해야겠군,,

	/* useEffect(() => {
        setDisabled(
            !(username && birthday && gender && !errorMessage)
        )
    }, [username, birthday, gender, errorMessage]) */
	//아이디 생일 성별(? 이거는 일단 디폴트 값이있낭) 입력하고 에러메시지 없어야 버튼 활성화 될수 있게
	return (
		<KeyboardAwareScrollView
			contentContainerStyle={{flex:1}}
			extraScrollHeight={20}
		>
			<StatusBar backgroundColor="#ffffff" barStyle="dark-content"/>
			<View style={styles.view}>
				<Text style={styles.title}>
                    JOIN
				</Text>
				<Text style={styles.subTitle}>
                    프로필 등록
				</Text>
			</View>
			<View
				style={{
					alignItems: "flex-start",
					paddingLeft: 30
				}}>
				<TouchableOpacity style={styles.profile}>
					<Icon 
						name="person-add-outline"
						size={60}
						color={"black"}
						style={{
							padding: 5,
							paddingRight:10,
							paddingTop: 7
						}} />
				</TouchableOpacity>
				<Input
					value={username}
					onChangeText={text=>setUsername(text)}
					onSubmitEditing={() => {
						setUsername(username.trim())
						usernameRef.current.focus()
					}}
					onBlur={() => setUsername(username.trim())}
					placeholder="아이디를 입력해주세요(특수문자 포함 10자이내)"
					returnKeyType="next"/>
				<ErrorText>{errorMessage}</ErrorText>
				<Input
					ref={usernameRef}
					value={selfBio}
					onChangeText={text=>setSelfBio(text)}
					onSubmitEditing={()=>selfBioRef.current.focus()}
					placeholder="자기소개를 작성해주세요."
					returnKeyType="done"
					
				/>
			</View>	
		</KeyboardAwareScrollView>
	)
}

const styles = StyleSheet.create({
	view: {
		flex: 0.4,
		alignItems: "flex-start",
		justifyContent: "center",
		paddingLeft: 30
	},
	title: {
		fontSize:24, 
		fontFamily: "Multicolore Pro", 
		color: "#2F5D9A",
		paddingBottom: 20
	},
	subTitle: {
		fontSize: 24,
		fontFamily: "SF-Pro-Text-Medium",
		color: "#2F5D9A"
	},
	profile: {
		width: 81,
		height: 81,
		borderRadius: 50,
		backgroundColor: "#DEDEDE",
		alignItems: "center",
	}
})
export default AddInfo