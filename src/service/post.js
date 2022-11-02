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

export function updatePost(postId, review){
	return instance({
		url: `/v1/post/${postId}`,
		method: "put",
		data: {
			review: review
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

export function subscriberPost() {
	return instance({
		url: "/v1/post/subscriber",
		method: "get",
	})
}

export function getPostsByMemberAndPlace(memberId,placeId) {
	return instance({
		url: "/v1/post",
		params: {
			memberId: memberId,
			placeId: placeId
		},
		method: "get",
	})
}
