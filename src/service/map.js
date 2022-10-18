import instance from "./request"

//post 생성
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