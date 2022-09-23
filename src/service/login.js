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

