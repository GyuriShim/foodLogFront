import instance from "./request"

//주소 검색
export function searchPlaceByAddress(keyword, page, size) {
	return instance({
		url: "/v1/place/search/address",
		method: "get",
		params: {
			query: keyword,
			page: page,
			size: size
		}
	})
}

//상호명 검색
export function searchPlaceByName(keyword, page, size) {
	return instance({
		url: "/v1/place/search/name",
		method: "get",
		params: {
			query: keyword,
			page: page,
			size: size
		}
	})
}

//메뉴 검색
export function searchPlaceByMenu(keyword, page, size) {
	return instance({
		url: "/v1/place/search/menu",
		method: "get",
		params: {
			query: keyword,
			page: page,
			size: size
		}
	})
}

export function getPlacesByMember(memberId) {
	return instance({
		url: `/v1/places/${memberId}`,
		method: "get",
	})
}