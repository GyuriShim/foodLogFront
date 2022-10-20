import instance from "./request"

//comment 작성
export function createComment(postId, comment) {
	return instance({
		url: `/v1/post/${postId}/comment`,
		method: "post",
		data: {
			comment: comment
		},
	})
}

//comment 삭제
export function deleteComment(postId, commentId) {
	return instance({
		url: `/v1/post/${postId}/comment/${commentId}`,
		method: "delete",
	})
}
