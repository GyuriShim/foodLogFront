import React, {useContext, useEffect, useState, useLayoutEffect} from "react"
import { Text, View, BackHandler, ActivityIndicator, RefreshControl } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import EmptySearchResult from "../components/EmptySearchResult"
import UserSearchResult from "../components/UserSearchResult"
import SubSearchContext from "../contexts/SubSearchContext"
import { getMemerList } from "../service/member"

const SubSearch = ({navigation}) => {
	const {userKeyword, onChangeSearchText} = useContext(SubSearchContext)
	const [loading, setLoading] = useState(false)
	const [member, setMember] = useState([])
	const [totalElements, setTotalElements] = useState()
	const [noMorePost, setNoMorePost] = useState(false)
	const [refreshing, setRefeshing] = useState(false)
	var last = false
	var page = 0
	const size = 15
	const [pageNum, setPageNum] = useState()
	
	const fetchMemberList = async() => {
		try {
			setLoading(true)
			const response = await getMemerList(userKeyword, 0, size)
			console.log(response.data)
			setMember(response.data.content)
			setTotalElements(response.data.totalElements)
			setPageNum(response.data.totalPages)
			last = response.data.last
			if (last) {
				setNoMorePost(true)
			}
			console.log("전체 페이지",response.data.totalPages)
		} catch (e) {
			console.log("catch error", e)
		}
		setLoading(false)
	}
	const fetchMoreMemberList = async(page) => {
		var moreMemeber = []
		try {
			setLoading(true)
			const response = await getMemerList(userKeyword, page, size)
			console.log(response.data)
			moreMemeber = response.data.content
			last = response.data.last
			if (last) {
				setNoMorePost(true)
			}
			console.log("전체 페이지",response.data.totalPages)
		} catch (e) {
			console.log("catch error", e)
		}
		setLoading(false)
		return moreMemeber
	}

	const onRefresh = async() => {
		if(!member || member.length === 0 || refreshing){
			return
		}
		setRefeshing(true)
		fetchMemberList()
		setRefeshing(false)
	}

	useEffect(() => {
		BackHandler.addEventListener(
			"hardwareBackPress",
			clear
		)
		return () => BackHandler.removeEventListener("hardwareBackPress", clear)
	},[])

	useLayoutEffect(()=> {
		setNoMorePost(false)
		if (userKeyword==="") {
			return
		} else {
			fetchMemberList()
		}
	},[userKeyword])
	
	const clear = () => {
		page = 0
		onChangeSearchText("")
		setMember([])
	}
	
	if(userKeyword === ""){
		return <EmptySearchResult type="EMPTY_KEYWORD"/>
	} else if(member.length === 0){
		return <EmptySearchResult type="NOT_FOUND"/>
	}

	if (loading) return <Text>로딩 중</Text>
	const _handleLoadMore = async() => {
		if (last || noMorePost || !member || member.length < size) {
			return
		}
		page += 1
		const olderPosts = await fetchMoreMemberList(page)
		console.log(totalElements)
		if (olderPosts.length < size || last){
			setNoMorePost(true)
		}
		setMember(member.concat(olderPosts))
	}

	return(
		<View style={{flex:1}}>
			<FlatList
				data={member}
				renderItem={({item}) => (<UserSearchResult item={item} onPress={() => navigation.navigate("account", item.id)}/>)}
				keyExtractor={(item) => item.id}
				onEndReached={_handleLoadMore}
				onEndReachedThreshold={1}
				ListFooterComponent={
					!noMorePost && (
						<ActivityIndicator style={{height: 64}} size={32} color="#6200ee"/>
					)
				}
				refreshControl={
					<RefreshControl onRefresh={onRefresh} refreshing={refreshing}/>
				}
			/>
		</View>
		
	)
}


export default SubSearch