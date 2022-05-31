import React, {useState, useRef, useEffect} from "react"
import {Image, StatusBar, View, Text, StyleSheet, TouchableOpacity, Platform, Alert} from "react-native"
import styled from "styled-components/native"
import { RadioButton } from "react-native-paper"
import axios from "axios"
import Input from "../components/Input.js"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Button from "../components/Button.js"
import { launchImageLibrary } from "react-native-image-picker"
import { removeWhitespace, validateBirthday, validateUsername } from "../utils/common.js"

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
	const [doubleCheck, setDoubleCheck] = useState(false)
	const [selfBio, setSelfBio] = useState("")
	const [idErrorMessage, setIdErrorMessage] = useState("")
	const [birthErrorMessage, setBirthErrorMessage] = useState("")
	const [gender, setGender] = useState("male")
	const [birthday, setBirthday] = useState("")
	const [response, setResonse] = useState(null)
	const [disabled, setDisabled] = useState(true)

	const selfBioRef = useRef()

	const _handleJoinButtonPress = () => {}

	const _handleDoubleCheckPress = async () => {
		try {
			Alert.alert("사용가능한 아이디입니다.", username)
			setDoubleCheck(true)
		} catch(e) {
			Alert.alert("이미 사용중인 아이디입니다.", e.message)
			setDoubleCheck(false)
		}
	}
	//중복확인 버튼 누르면 서버랑 통신해서 중복되는 값 있는지 확인하는 코드 필요

	/* onPress={()=>(axios({
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
				>*/

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
		} else if(username.length < 8) {
			_errorMessage = "8자 이상 입력해주세요."
		} else if(!validateUsername(username)) {
			_errorMessage = "아이디는 숫자, 영문, 밑줄, 마침표만 사용가능합니다."
		}  else {
			_errorMessage = ""
		}
		setIdErrorMessage(_errorMessage)
	}, [username])

	//username이 변경될때마다 중복확인값 false로 변경
	useEffect(() => {
		setDoubleCheck(false)
	},[username])

	useEffect(() => {
		let _errorMessage = ""
		if (!birthday){
			_errorMessage = "생년월일을 입력해주세요."
		} else if(!validateBirthday(birthday)) {
			_errorMessage = "형식에 맞게 입력해주세요."
		}else {
			_errorMessage = ""
		}
		setBirthErrorMessage(_errorMessage)
	}, [birthday])
	
	
	//중복확인 결과도 포함,,
	useEffect(() => {
		setDisabled(
			!(username && birthday && !idErrorMessage  && !birthErrorMessage && doubleCheck)
		)
	}, [username, birthday, idErrorMessage, birthErrorMessage, doubleCheck])

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
					onChangeText={text => setUsername(removeWhitespace(text))}
					onSubmitEditing={() => selfBioRef.current.focus()}
					placeholder="아이디를 입력해주세요(밑줄,마침표 포함 8~15자)"
					returnKeyType="next"
					maxLength={15}
				>
				</Input>
				
				<Button 
					title="아이디 중복확인" 
					isFilled={true} 
					disabled={idErrorMessage !== ""}
					containerStyle={styles.button}
					onPress={_handleDoubleCheckPress}
				></Button>
				<ErrorText>{idErrorMessage}</ErrorText>
				<Input
					height={100}
					ref={selfBioRef}
					value={selfBio}
					onChangeText={text=>setSelfBio(text)}
					placeholder="자기소개를 작성해주세요."
					returnKeyType="done"
					maxLength={50}
					multiline={true}
				/>
				<Text style={styles.label}>생일</Text>
				<Input
					height={40}
					value={birthday}
					onChangeText={text => setBirthday(removeWhitespace(text))}
					onSubmitEditing={() => {
						setBirthday(birthday.trim())
						_handleJoinButtonPress
					}}
					placeholder="생년월일 8자리를 입력해주세요."
					maxLength={8}
				>
				</Input>
				<ErrorText>{birthErrorMessage}</ErrorText>
				<View
					style={{
						flexDirection: "row", 
						alignSelf: "center",
					}}
				>
					<View style={styles.radioButtonContainer}>
						<RadioButton
							value="male"
							status={gender === "male" ? "checked":"unchecked"}
							onPress={() => setGender("male")}
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
							status={gender === "female" ? "checked":"unchecked"}
							onPress={() => setGender("female")}
							color="#FF8383"
							uncheckedColor="#FFB7B7"
						/>
						<Text style={styles.gender}>
							여자
						</Text>
					</View>
				</View>
				<View style={{flexDirection: "row", alignSelf:"center"}}>
					<Button 
						title="BACK" 
						isFilled={true} 
						containerStyle={styles.smallButton}
					></Button>
					<Button 
						title="JOIN" 
						isFilled={true} 
						disabled={disabled} 
						containerStyle={styles.smallButton}
						onPress={_handleJoinButtonPress}
					></Button>
					{/* join버튼 눌렀을 때 프로필 정보 서버로 보내줘야함 */}
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
		paddingBottom: 15
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
		fontFamily:"Arial",
		marginBottom: 10
	},
	smallButton: {
		width: "45%",
		marginHorizontal: 10,
		marginTop: 10,
		height: 34,
		justifyContent: "center",
	},
	label: {
		fontSize: 13,
		fontWeight: "300",
		color: "black",
		paddingLeft: 5
	}
})
export default AddInfo