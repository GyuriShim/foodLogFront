import instance from "./request"

//post 생성
export function createPostApi(formData) {
	return instance({
		url: "/v1/post",
		method: "post",
		data: formData,
		headers: {
			"Content-Type": "multipart/form-data",
			"ACCESS-TOKEN": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzMjE4MDg0NkBkYW5rb29rLmFjLmtyIiwiaXNzIjoiZm9vZCBsb2ciLCJtZW1iZXJJZCI6NDAsImlhdCI6MTY2NTI0MjQwOSwiZXhwIjoxNjY1MjUzMjA5fQ.rkgBZ6bH8ZhgK0TmmrlyYXBsmgoAuMQZ4T_4AEuhe1bVmRGo5WHo2OzXCC0liW6XvMeRb9dHGrb19gsQyB39UQ"
		},
	})
}
//post 조회
export function getPostApi(postId) {
	return instance({
		url: `/v1/post/${postId}`,
		method: "get",
		data: {
			
		},
	})
}

export function deletePostApi(postId) {
	return instance({
		url: `/v1/post/${postId}`,
		method: "delete",
		data: {
			
		},
	})
}
