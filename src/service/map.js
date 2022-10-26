import instance from "./request"

// map 생성 - filter 포함
export function getMap(mapRequest) {
	return instance({
		url: "/v1/map",
		method: "post",
		data: {
			latitude: mapRequest.latitude,
			longitude: mapRequest.longitude,
			latitudeDelta: mapRequest.latitudeDelta,
			longitudeDelta: mapRequest.longitudeDelta,
			purposeList: mapRequest.purposeList,
			categoryList: mapRequest.categoryList,
			rating: mapRequest.rating
		},
	})
}

// place Post
export function getPlacePost(placePostId) {
	return instance({
		url: `/v1/place-post/${placePostId}`,
		method: "get",
	})
}