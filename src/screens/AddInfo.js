import React, {useState, useRef, useEffect} from "react"
import {StatusBar, View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Linking} from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import Input from "./components/Input.js"
import styled from "styled-components/native"
import { RadioButton } from "react-native-paper"
import axios from "axios"
import DateTimePicker from "react-native-modal-datetime-picker"

const ErrorText = styled.Text`
    align-items: flex-start
    width: 100%
    height: 13px
    line-height: 15.51px
    margin-top: 4
    margin-bottom: 7
    margin-left: 5
    font-family: SF-Pro-Text-Regular
    font-style: normal
    color: red
`
const AddInfo = () => {
	const [username, setUsername] = useState("")
	const [selfBio, setSelfBio] = useState("")
	const [errorMessage, sestErrorMessage] = useState("")
	const [checked, setChecked] = useState("male")
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
	const [birthday, setBirthday] = useState("")
	//const [disabled, setDisabled] = useState(true)
	//생일 추가해야함
	//아이디 중복확인 버튼도 추가해야함

	const usernameRef = useRef()
	const selfBioRef = useRef()

	const showDatePicker = () => {
		setDatePickerVisibility(true)
	}

	const hideDatePicker = () => {
		setDatePickerVisibility(false)
	}

	const handleConfirm = (date) => {
		// console.log(date.format("yyyy/MM/dd"))
		// setBirthday(date.format("yyyy/MM/dd"))
		hideDatePicker()
	}
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
		<KeyboardAvoidingView>
			<StatusBar backgroundColor="#ffffff" barStyle="dark-content"/>
			<View style={styles.view}>
				<Text style={styles.title}>
                    JOIN
				</Text>
				<Text style={styles.subTitle}>
                    프로필 등록
				</Text>
				<TouchableOpacity style={styles.profile} onPress={()=>Linking.openURL("http://10.0.2.2:8000/google/login")}>
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
					height= {40}
					value={username}
					onChangeText={text=>setUsername(text)}
					onSubmitEditing={() => {
						setUsername(username.trim())
						usernameRef.current.focus()
					}}
					onBlur={() => setUsername(username.trim())}
					placeholder="아이디를 입력해주세요(특수문자 포함 10자이내)"
					returnKeyType="next"
					maxLength={10}
				>
				</Input>
				<TouchableOpacity style={{height: 20, width: 20, backgroundColor: "black"}} 
					onPress={()=>(axios({
						url: "http://10.0.2.2:8000/api/member/create/7",
						method: "POST",
						headers: {
							"ACCESS-TOKEN" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJmb29kIGxvZyIsIm1lbWJlcklkIjo3LCJpYXQiOjE2NTI4NzYxNzcsImV4cCI6MTY1Mjk2MjU3N30.ZYTD4WsmAHkn7PkGS9MuKvNI5jvpSz9s5y69SLEuyelY2gS-DkvEvQpncjkyvVfTIsn4_SAGu93J1A46S72Rxg"
						},
						data: {
							username: "akakakaka"
						}
					})).catch((error)=> {
						console.error("실패: ", error)
					})}
				>	
				</TouchableOpacity>
				<ErrorText>{errorMessage}</ErrorText>
				<Input
					height={100}
					ref={usernameRef}
					value={selfBio}
					onChangeText={text=>setSelfBio(text)}
					onSubmitEditing={()=>selfBioRef.current.focus()}
					placeholder="자기소개를 작성해주세요."
					returnKeyType="done"
					maxLength={50}
					multiline={true}
				/>
				<View
					style={{
						flexDirection: "row", 
						alignSelf: "center",
					}}
				>
					<View style={styles.radioButtonContainer}>
						<RadioButton
							value="male"
							status={checked === "male" ? "checked":"unchecked"}
							onPress={() => setChecked("male")}
							color="#FF8383"
							uncheckedColor="#FFB7B7"
						/>
						<Text style={styles.gender}>
							남자
						</Text>
					</View>	
					<View style={styles.radioButtonContainer}>
						<RadioButton
							value="female"
							status={checked === "female" ? "checked":"unchecked"}
							onPress={() => setChecked("female")}
							color="#FF8383"
							uncheckedColor="#FFB7B7"
						/>
						<Text style={styles.gender}>
							여자
						</Text>
					</View>
				</View>
				<View>
					<TouchableOpacity style={{height:20, width:20, backgroundColor: "grey"}}
						onPress={showDatePicker}>
						<Text>생일</Text>
						<DateTimePicker
							isVisible={isDatePickerVisible}
							mode="date"
							onConfirm={handleConfirm}
							onCancel={hideDatePicker}
							
						/>
					</TouchableOpacity>
					<Text style={styles.subTitle}>{birthday}</Text>
				</View>
			</View>	
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	view: {
		alignItems: "flex-start",
		margin: 30,
		paddingTop: 30
	},
	title: {
		fontSize:24, 
		fontFamily: "Multicolore Pro", 
		color: "#2F5D9A",
		paddingBottom: 30
	},
	subTitle: {
		fontSize: 24,
		fontFamily: "SF-Pro-Text-Medium",
		color: "#2F5D9A",
		paddingBottom: 20
	},
	profile: {
		width: 81,
		height: 81,
		borderRadius: 50,
		backgroundColor: "#DEDEDE",
		alignItems: "center",
	},
	radioButtonContainer: {
		flexDirection: "row",
		justifyContent: "center",
		width: 150
	},
	gender: {
		fontSize: 13,
		fontFamily: "SF-Pro-Text-Regular",
		paddingTop: 5
	}
})
export default AddInfo