import instance from "./request"

//member 조회
export function getMember(id) {
	return instance({
		url: `/v1/member/profile/${id}`,
		method: "get"
	})
}