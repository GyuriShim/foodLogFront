import React, {useContext, useEffect, useState, useLayoutEffect} from "react"
import { ScrollView, Text, View, StyleSheet, BackHandler } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import EmptySearchResult from "../components/EmptySearchResult"
import UserSearchResult from "../components/UserSearchResult"
import SubSearchContext from "../contexts/SubSearchContext"
import { getMemerList } from "../service/member"

const SubSearch = ({navigation}) => {
	const {userKeyword, onChangeSearchText} = useContext(SubSearchContext)
	const [loading, setLoading] = useState(false)
	const [member, setMember] = useState([])
	const [totalPage, setTotalPage] = useState()
	var page = 0
	const size = 15
	
	const fetchMemberList = async() => {
		try {
			setLoading(true)
			console.log("1 ",page)
			const response = await getMemerList(userKeyword, page, size)
			setMember(response.data.content)
			setTotalPage(response.data.totalPages)
			console.log(response.data.content)
			console.log(response.data.totalPages)
			page += 1
			console.log("2 ",page)
		} catch (e) {
			console.log("catch error", e)
		}
		setLoading(false)
	}
	useEffect(() => {
		BackHandler.addEventListener(
			"hardwareBackPress",
			clear
		)
		return () => BackHandler.removeEventListener("hardwareBackPress", clear)
	},[])

	useLayoutEffect(()=> {
		page = 0
		fetchMemberList()
	},[userKeyword])
	
	const clear = () => {
		onChangeSearchText("")
		setMember([])
	}
	
	if(userKeyword === ""){
		return <EmptySearchResult type="EMPTY_KEYWORD"/>
	}

	const _handleLoadMore = () => {
		if (page === totalPage) {
			return
		} else {
			fetchMemberList()
		}
	}

	/* const onScroll = (e) => {
		const {contentSize, layoutMeasurement, contentOffset} = e.nativeEvent
		const distanceFromBottom = contentSize.height - layoutMeasurement.height - contentOffset.y
		if (distanceFromBottom < 72) {
			console.log("바닥이 가까워요.")
			if (loading) {
				return
			} else {
				console.log("3 ",page)
				fetchMemberList()
			}
		} else {
			console.log("바닥과 멀어졌어요.")
		}
	} */

	return(
		<View style={{flex:1}}>
			<FlatList
				data={member}
				//이거 parameter 수정중이였슴(스택으로 계정 화면 쌓일때 헤더 타이틀 바꾸는거), 
				//아니면 account 스크린에,, 웅 이것도 차피 파라미터는 넘겨줘야하네
				//그리고 왼쪽 위 뒤로가기 버튼 눌렀을 때
				//검색 내용 초기화 시키기,, 스크롤 렌더링,, 안대
				renderItem={({item}) => (<UserSearchResult item={item} onPress={() => navigation.navigate("account", item.id)}/>)}
				keyExtractor={(item, index) => item.id}
				onEndReached={() => _handleLoadMore()}
				onEndReachedThreshold={1}
				//onScroll={onScroll}
			/>
		</View>
		
	)
}
const styles = StyleSheet.create({
	block: {}
})

export default SubSearch