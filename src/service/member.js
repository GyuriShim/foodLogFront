import instance from "./request"

//member 조회
export function getMember(id) {
	return instance({
		url: `/v1/member/profile/${id}`,
		method: "get"
	})
}

export function modifyMember(formdata) {
	return instance({
		url: "/v1/member/profile",
		method: "put",
		data: formdata,
		headers: {
			"Content-Type" : "multipart/form-data"
		}
	})
}

export function getMemerList(username, page, size) {
	return instance({
		url: "/v1/member/list",
		method: "get",
		params: {
			username: username,
			page: page,
			size: size
		}
	})
}