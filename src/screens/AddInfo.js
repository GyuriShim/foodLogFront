import React, {useState, useRef, useEffect} from "react"
import {Image, StatusBar, View, Text, StyleSheet, TouchableOpacity, Platform} from "react-native"
import styled from "styled-components/native"
import { RadioButton } from "react-native-paper"
import axios from "axios"
//import DateTimePicker from "react-native-modal-datetime-picker"
import Input from "../components/Input.js"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Button from "../components/Button.js"
import {launchImageLibrary} from "react-native-image-picker"


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
	const [errorMessage, setErrorMessage] = useState("")
	const [checked, setChecked] = useState("male")
	const [birthday, setBirthday] = useState("")
	const [response, setResonse] = useState(null)
	//const [disabled, setDisabled] = useState(true)

	const usernameRef = useRef()
	const selfBioRef = useRef()

	const _handleJoinButtonPress = () => {}

	const handlePress = (e) => {
		const format = /[0-9]{8}/
		if(format.test(e)){
			setBirthday(e)
		} else {
			setErrorMessage("형식에 맞게 입력해주세요.")
		}
	}

	const onSelectImage = () => {
		launchImageLibrary(
			{
				mediaType: "photo",
				maxWidth: 512,
				maxHeight: 512,
				includeBase64: Platform.OS === "android"
			},
			(res) => {
				if (res.didCancel){
					return
				}
				setResonse(res)
			}
		)
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
		setErrorMessage(_errorMessage)
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
			extraScrollHeight={30}
		>
			<StatusBar backgroundColor="#ffffff" barStyle="dark-content"/>
			<View style={styles.view}>
				<Text style={styles.title}>
                    JOIN
				</Text>
				<Text style={styles.subTitle}>
                    프로필 등록
				</Text>
				<TouchableOpacity onPress={onSelectImage}>
					<Image 
						style={styles.profile}
						source={{uri: response?.assets[0]?.uri}} />
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
				<TouchableOpacity style={styles.button} 
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
					<Text>아이디 중복확인</Text>	
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
				<Text style={{
					fontSize: 13,
					fontWeight: "300",
					color: "black",
					paddingLeft: 5
				}}>생일</Text>
				<Input
					height={40}
					value={birthday}
					onChangeText={text=>setBirthday(text)}
					onSubmitEditing={() => {
						setBirthday(birthday.trim())
						handlePress(birthday)
						_handleJoinButtonPress
					}}
					placeholder="yyyy/mm/dd"
					maxLength={8}
				>
				</Input>
				<ErrorText>{errorMessage}</ErrorText>
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
				<View style={{flexDirection: "row", alignSelf:"center", justifyContent:"space-between"}}>
					<Button title="BACK" isFilled={true}></Button>
					<Button title="JOIN" isFilled={true}></Button>
				</View>
			</View>	
		</KeyboardAwareScrollView>
	)
}

const styles = StyleSheet.create({
	view: {
		alignItems: "flex-start",
		marginHorizontal: 30,
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
	},
	button:{
		height: 35, 
		width: "100%", 
		backgroundColor: "rgba(165, 212, 233, 0.5)", 
		borderRadius: 4, 
		alignItems: "center", 
		justifyContent:"center", 
		fontFamily:"Arial",
		marginBottom: 10
	}
})
export default AddInfo