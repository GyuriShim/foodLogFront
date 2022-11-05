import instance from "./request"
import axios from "axios"

//post 생성

export function createPost(formData) {
	return instance({
		url: "/v1/post",
		method: "post",
		data: formData,
		headers : {
			"Content-Type" : "multipart/form-data"
		}
	})
}
/*
export const createPost = async(formData) => {
	const headers = {
		"Content-Type" : "multipart/form-data",
		"Authorization" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzMjE4MDg0NkBkYW5rb29rLmFjLmtyIiwiaXNzIjoiZm9vZCBsb2ciLCJtZW1iZXJJZCI6NDAsImlhdCI6MTY2NzY0MzI4MSwiZXhwIjoxNjY3NjU0MDgxfQ.Da_GrULY2l6J6bvdADqe0OJZ0kn6Kg2DceSjxE9kRrKrMh5ezgiYDJvyHtK1Y2MZFZ490sHhl_bV0UKKJ2icfg"
	}
	const response = await axios.post("http://food-log-dku.com:8080/api/v1/post", formData, {headers})
	return response
}*/

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