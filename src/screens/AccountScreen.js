import React, {useEffect, useLayoutEffect, useState} from "react"
import { View, StyleSheet, Image, Text, ScrollView, Pressable } from "react-native"
import styled from "styled-components"
import MapView from "react-native-maps"
import PropTypes from "prop-types"
import { getItemFromAsync } from "../utils/StorageFun"
import { getMember } from "../service/member"
import { follower,following, Subscribe, Unsubscribe } from "../service/subscribe"
import { useIsFocused } from "@react-navigation/native"

const Container = styled.View`
	align-items: center
	background-color: white
	flex: 1
	padding-horizontal: 15px
	padding-top: 20px
	justify-content: space-around
`

const AccountScreen = ({navigation, route}) => {
	const [url, setUrl] = useState()
	const [userFollower, setUserFollower] = useState()
	const [userFollowing, setUserFolloing] = useState()
	const [userName, setUserName] = useState()
	const [selfBio, setSelfBio] = useState()
	const [loading, setLoading] = useState(false)
	const [myId, setMyId] = useState()
	const [memberId, setMemberId] = useState()
	const [isFollowing, setIsFollowing] = useState(false)
	const [refreshing, setRefeshing] = useState(false)
	const isFocused = useIsFocused()

	const fetchProfile = async () => {
		try{
			setLoading(true)
			var response
			var followerRes
			var followingRes
			console.log("route",route)
			const userInfo = JSON.parse(await getItemFromAsync("user"))
			setMyId(userInfo.id)
			console.log("user",userInfo)
			if (route?.params) {
				response = await getMember(route?.params)
				followerRes = await follower(route?.params)
				followingRes = await following(route?.params)
			} else {
				response = await getMember(userInfo.id)
				followerRes = await follower(userInfo.id)
				followingRes = await following(userInfo.id)
			}
			//const response = await getMember(route !== null? route?.params : userInfo.id)
			console.log(response.data)
			console.log(followerRes.data, followingRes.data)
			setMemberId(response.data.memberId)
			setUserName(response.data.username)
			setSelfBio(response.data.selfBio)
			setUrl(response.data.profilePicture)
			setIsFollowing(response.data.following)
			setUserFolloing(followingRes.data.totalElements)
			setUserFollower(followerRes.data.totalElements)
		} catch(e){
			console.log("catch error", e)
		}
		setLoading(false)
	}

	useEffect(() => {
		fetchProfile()
	}, [isFocused])

	useLayoutEffect(() => {
		navigation.setOptions({headerTitle: userName})
		fetchProfile()
	},[userName, refreshing])

	const subscribeAxios = async(memberId) => {
		await Subscribe(memberId)
			.then(response => {
				if(response){
					console.log(response.data)
					console.log("subscribe")
					setRefeshing(!refreshing)
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}

	const unsubscribeAxios = async(memberId) => {
		await Unsubscribe(memberId)
			.then(response => {
				if(response){
					console.log(response.data)
					console.log("unsubscribe")
					setRefeshing(!refreshing)
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}

	if (loading) return <Text>로딩 중</Text>

	return(
		<>
			<Container>
				<View
					style={{width: "100%", height: "15%", paddingHorizontal: "3%", paddingTop: 10, justifyContent:"center"}}
				>
					<View
						style={{flexDirection: "row", justifyContent: "space-between",alignItems:"center", paddingBottom: 5}}
					>
						<Image 
							style={styles.profile}
							source={{uri: `${url}`}}/>
						<View
							style={{
								width: "70%", 
								height: "80%", 
								backgroundColor: "rgba(196, 196, 196, 0.22)", 
								borderRadius:5, 
								flexDirection: "row", 
								justifyContent:"space-evenly",
							}}
						>
							<Pressable style={{justifyContent: "center"}} onPress={() => navigation.navigate("follower",  memberId)}>
								<Text style={{alignSelf: "center"}}>{userFollower}</Text>
								<Text style={{alignSelf: "center"}}>팔로워</Text>
							</Pressable>
							<Pressable style={{justifyContent: "center"}} onPress={() => navigation.navigate("following",  memberId)}>
								<Text style={{alignSelf: "center"}}>{userFollowing}</Text>
								<Text style={{alignSelf: "center"}}>팔로잉</Text>
							</Pressable>
							{myId===memberId? 
								(<Pressable style={{justifyContent: "center"}} onPress={() => navigation.navigate("Modify")}>
									<Text>수정</Text>
								</Pressable>)
								:(isFollowing===false?
									(<Pressable style={{justifyContent: "center"}} onPress={() => subscribeAxios(memberId)}>
										<Text>구독</Text>
									</Pressable>):
									(<Pressable style={{justifyContent: "center"}} onPress={() => unsubscribeAxios(memberId)}>
										<Text>구독중</Text>
									</Pressable>
									)
								)
							}
						</View>
					</View>
					<View>
						<Text>@{userName}</Text>
						<ScrollView style ={{height: 40, marginBottom:10}}>
							<Text>{selfBio}</Text>
						</ScrollView>
						
					</View>
				</View>
				<MapView
					style={{height: "74%", width: "100%"}}
					initialRegion={{
						latitude: 35.90, 
						longitude: 127.5,
						latitudeDelta: 5,
						longitudeDelta: 5
					}}
					customMapStyle={mapStyle}
				>
				</MapView>
			</Container>
		</>
	)
}

AccountScreen.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}).isRequired,
}

export default AccountScreen

const styles = StyleSheet.create({
	profile: {
		width: 81,
		height: 81,
		borderRadius: 50,
		backgroundColor: "#DEDEDE",
		alignItems: "center",
	}
})

const mapStyle = [
	{
		"stylers": [
			{
				"lightness": 15
			}
		]
	},
	{
		"featureType": "road",
		"stylers": [
			{
				"visibility": "simplified"
			}
		]
	}
]