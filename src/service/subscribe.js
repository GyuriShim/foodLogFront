import instance from "./request"

//팔로워 조회
export function follower(id) {
	return instance({
		url: `/v1/subscribe/follower/${id}`,
		method: "get"
	})
}

//팔로잉 조회
export function following(id) {
	return instance({
		url: `/v1/subscribe/following/${id}`,
		method: "get"
	})
}