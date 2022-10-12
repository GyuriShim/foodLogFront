import axios from "axios"
// import instance from "./request"

// 로그인
export const login = async(email) => {
	const data = {
		email: email
	}
	const headers = {
		"content-type": "application/json"
	}
	const response = await axios.post("http://food-log-dku.com:8080/api/v1/login", data, {headers})
	return response
}

// 회원가입
export const join = async(formData) => {
	const headers = {
		"Content-Type" : "multipart/form-data"
	}
	const response = await axios.post("http://food-log-dku.com:8080/api/v1/join", formData, {headers})
	return response
}


// username 중복확인
export const checkUsername = async(username) => {
	const headers = {
		"Content-Type" : "text/plain"
	}
	const response = await axios.post("http://food-log-dku.com:8080/api/v1/member/username", username, {headers})
	return response
}
