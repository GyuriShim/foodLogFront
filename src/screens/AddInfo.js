import React, {useState, useRef, useEffect, useContext} from "react"
import {Image, StatusBar, View, Text, StyleSheet, TouchableOpacity, Platform, Alert} from "react-native"
import styled from "styled-components/native"
import { RadioButton } from "react-native-paper"
import axios from "axios"
import Input from "../components/Input.js"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Button from "../components/Button.js"
import { launchImageLibrary } from "react-native-image-picker"
import { removeWhitespace, validateBirthday, validateUsername } from "../utils/common.js"
import PropTypes from "prop-types"
import UserContext from "../contexts/User.js"
import { getItemFromAsync, setItemToAsync } from "../utils/StorageFun.js"
import moment from "moment"
import { join, checkUsername } from "../service/login"
import UserIdContext from "../contexts/UserId.js"

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

const AddInfo = ({navigation}) => {
	const [username, setUsername] = useState("")
	const [doubleCheck, setDoubleCheck] = useState(false)
	const [selfBio, setSelfBio] = useState("")
	const [idErrorMessage, setIdErrorMessage] = useState("")
	const [birthErrorMessage, setBirthErrorMessage] = useState("")
	const [gender, setGender] = useState("M")
	const [birthday, setBirthday] = useState("")
	const [response, setResponse] = useState(null)
	const [disabled, setDisabled] = useState(true)
	const [file, setFile] = useState(null)
	const { dispatch } = useContext(UserContext)
	const {userId, setUserId} = useContext(UserIdContext)
	
	// eslint-disable-next-line no-undef
	


	const selfBioRef = useRef()

	const joinButton = async (data) => {
		const userInfo = JSON.parse(await getItemFromAsync("user"))
		// eslint-disable-next-line no-undef
		const formdata = new FormData()
		formdata.append("dto", JSON.stringify(data))

		if (file != null) {
			console.log("set file")
			formdata.append("image", file)
		}

		try {		
			await join(formdata)
				.then((res) => {
					console.log(res.data)
					const user = {
						"accessToken" : res.data.accessToken,
						"id": res.data.id,
						"email" : userInfo.email
					}
					setItemToAsync("user", JSON.stringify(user))
					setUserId(res.data.id)
					dispatch(true)
				})
				.catch((error) => console.log(error))
		} catch (error) {
			console.log("error", error)
		}
	}

	const _handleJoinButtonPress = async () => {
		try {
			const userInfo = JSON.parse(await getItemFromAsync("user"))
			console.log("userInfo", userInfo)
			const data = {
				email: userInfo.email,
				username: username,
				birthday: birthday,
				selfBio: selfBio,
				gender: gender,
			}
			await joinButton(data)
		} catch (error) {
			console.log("join button error", error)
		}
	}

	const _handleDoubleCheckPress = async () => {
		try {
			checkUsername(username)
				.then((response) => {
					if (response.data == true) {
						Alert.alert("이미 사용중인 아이디입니다.")
						setDoubleCheck(false)
					} else {
						Alert.alert("사용가능한 아이디입니다.", username)
						setDoubleCheck(true)
					}
				})
		} catch(e) {
			console.log(e)
		}
	}
	//중복확인 버튼 누르면 서버랑 통신해서 중복되는 값 있는지 확인하는 코드 필요

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
				const image = {
					uri: res?.assets[0]?.uri,
					type: res?.assets[0]?.type,
					name: res?.assets[0]?.fileName,
				}
				console.log("file", image)
				setFile(image)
				
				//setResponse(profilePic)
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
			style={{flex: 1, backgroundColor: "#ffffff"}}
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
						source={{uri: file?.uri}} />
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
						setBirthday(moment(birthday, "YYYYMMDD").format("YYYY-MM-DD"))
					}}
					placeholder="생년월일 8자리를 입력해주세요."
					maxLength={10}
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
							value="M"
							status={gender === "M" ? "checked":"unchecked"}
							onPress={() => setGender("M")}
							color="#FF8383"
							uncheckedColor="#FFB7B7"
						/>
						<Text style={styles.gender}>
							남자
						</Text>
					</View>	
					<View style={styles.radioButtonContainer}>
						<RadioButton
							value="F"
							status={gender === "F" ? "checked":"unchecked"}
							onPress={() => setGender("F")}
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
						onPress={() => navigation.goBack()}
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

AddInfo.propTypes = {
	navigation : PropTypes.shape({
		navigate : PropTypes.func.isRequired,
	}).isRequired
}

const styles = StyleSheet.create({
	view: {
		alignItems: "flex-start",
		paddingHorizontal: 30,
		paddingTop: 30,
		backgroundColor: "#ffffff",
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
		marginBottom: 10,
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