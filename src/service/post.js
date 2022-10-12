import instance from "./request"

//post 생성
export function createPost(formData) {
	return instance({
		url: "/v1/post",
		method: "post",
		data: formData,
		headers: {
			"Content-Type": "multipart/form-data",
		},
	})
}

//post 조회
export function getPost(postId) {
	return instance({
		url: `/v1/post/${postId}`,
		method: "get",
		data: {
			
		},
	})
}

export function deletePost(postId) {
	return instance({
		url: `/v1/post/${postId}`,
		method: "delete",
		data: {
			
		},
	})
}
