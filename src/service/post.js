import instance from "./request"

//post 생성
export function createPost(newPost) {
	return instance({
		url: "/v1/post",
		method: "post",
		data: {
			memberId: newPost.memberId,
			review: newPost.review,
			rating: newPost.rating,
			purpose: newPost.purpose,
			date: newPost.date,
			pictures: ["123", "456"],
			place: {
				kakaoId : newPost.kakaoId,
				name : newPost.name,
				address: newPost.address,
				category: newPost.category,
				longitude: newPost.longitude,
				latitude: newPost.latitude,
			},
		},
		headers: {
			"Content-Type": "application/json",
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
		url: "/v1/posts",
		params: {
			memberId: memberId,
			placeId: placeId
		},
		method: "get",
	})
}