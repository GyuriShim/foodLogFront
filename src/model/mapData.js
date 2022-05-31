const Images = [
	{ image: require("../assets/images/고든램지.jpg")},
	{ image: require("../assets/images/롯데리아.jpg")},
	{ image: require("../assets/images/블랙마스터.jpg")},
	{ image: require("../assets/images/프랭크버거.jpg")}
]

export const markers = [
	{
		coordinate: {
			latitude: 37.399214,
			longitude: 126.922270
		},
		title: "고든램지 버거",
		address: "서울특별시 송파구 올림픽로 300 롯데월드몰 B1 고든램지 버거",
		image: Images[0].image,
		rating: 4,
	},
	{
		coordinate: {
			latitude: 37.399308,
			longitude: 126.922966
		},
		title: "롯데리아 안양점",
		address: "경기도 안양시 만안구 안양1동 674-146",
		image: Images[1].image,
		rating: 3.9,
	},
	{
		coordinate: {
			latitude: 37.398706,
			longitude: 126.924367
		},
		title: "블랙마스터",
		address: "경기도 안양시 만안구 만안로 199",
		image: Images[2].image,
		rating: 4.5,
	},
	{
		coordinate: {
			latitude: 37.399906,
			longitude: 126.923041
		},
		title: "프랭크버거",
		address: "경기도 안양시 만안구 안양동 만안로 217",
		image: Images[3].image,
		rating: 4.3,
	},
]