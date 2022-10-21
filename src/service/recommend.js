import instance from "./request"

export function recommend(foodPurpose) {
	return instance({
		url: "/v1/post/recommend",
		method: "get",
		params: {
            foodPurpose: foodPurpose,
        },
	})
}