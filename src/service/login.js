import instance from "./request"

// 로그인
export function login(email) {
	return instance({
		url: "/v1/login",
		method: "post",
		data: {
			email: email
		},
	})
}

// 회원가입
export function join(formData) {
	return instance({
		url: "/v1/join", formData,
		method: "post",
	})
}

// username 중복확인
export function checkUsername(username) {
	return instance({
		url: "/v1/member/username",
		method: "post",
		headers: {
			"Content-Type" : "text/plain"
		},
		data: {
			username
		},
	})
}
