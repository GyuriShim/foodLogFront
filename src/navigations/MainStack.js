import React, { useContext, useEffect, useState } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import MainTab from "./MainTab"
import UploadScreen from "../screens/UploadScreen"
import PostScreen from "../screens/PostScreen"
import SearchScreen from "../screens/SearchScreen"
import SearchHeader from "../components/SearchHeader"
import Follower from "../screens/Follower"
import Following from "../screens/Following"
import SubSearch from "../screens/SubSearch"
import SubSearchHeader from "../components/SubSearchHeader"
import AccountScreen from "../screens/AccountScreen"
import ModifyProfile from "../screens/ModifyProfile"
import UpdateScreen from "../screens/UpdateScreen"
import KeySearchScreen from "../screens/KeySearchScreen"
import { Pressable } from "react-native"
import SubSearchContext from "../contexts/SubSearchContext"
import { AntIcon } from "../assets/icons/AntIcon"
import SearchContext from "../contexts/SearchContext"
import MapSearchResult from "../screens/MapSearchResult"

const Stack = createStackNavigator()

const MainStack = () => {
	const {onChangeSearchText} = useContext(SubSearchContext)
	const {onChangeText} = useContext(SearchContext)
	return (
		<Stack.Navigator
			screenOptions={{
				cardStyle: {backgroundColor: "white"}
			}}
		>
			<Stack.Screen name="main" component={MainTab} options={{ headerShown: false }} />
			<Stack.Screen 
				name="search" 
				component={SearchScreen} 
				options={({navigation}) =>({
					title: "검색",
					headerTitle: () => <SearchHeader />,
					headerStyle: {
						height:100, 
						backgroundColor: "rgba(190, 235, 255, 0.4)", 
						borderBottomColor: "#ccc", 
						borderBottomWidth:2
					},
					headerLeft: (props) => (
						<Pressable {...props} onPress={()=>{onChangeText(""),navigation.goBack()}} style={{marginHorizontal: 12}}>
							<AntIcon name="arrowleft" size={24} color="black"/>
						</Pressable>
					)
				})}/>
			<Stack.Screen 
				name="follower" 
				component={Follower}
				options={{
					title: "팔로워",
					headerStyle: {
						borderBottomWidth: 2
					}
				}}
			/>
			<Stack.Screen 
				name="following" 
				component={Following}
				options={{
					title: "팔로잉",
					headerStyle: {
						borderBottomWidth: 2
					}
				}}
			/>
			<Stack.Screen
				name="subSearch"
				component={SubSearch}
				options={({navigation}) =>({
					headerTitle: () => <SubSearchHeader/>,
					headerStyle: {
						height: 55,
						borderBottomWidth: 1,
						borderBottomColor: "#ccc",
					},
					headerLeft: (props) => (
						<Pressable {...props} onPress={()=>{onChangeSearchText(""),navigation.goBack()}} style={{marginLeft: 10}}>
							<AntIcon name="arrowleft" size={24} color="black"/>
						</Pressable>
					)
				})}
			/>
			<Stack.Screen
				name="account"
				component={AccountScreen}
				options={{
					headerTitle: "",
				}}
			/>
			<Stack.Screen name="UploadScreen" component={UploadScreen}
				options={{title: "게시물 작성", headerBackTitle: "back"}}
			/>
			<Stack.Screen name="PostScreen" component={PostScreen}
				options={{title: "게시물", headerBackTitle: "back"}}/>
			<Stack.Screen name="Modify" component={ModifyProfile}
				options={{headerShown: false}}
			/>
			<Stack.Screen name="UpdateScreen" component={UpdateScreen}
				options={{title: "게시물수정", headerBackTitle: "back"}}
			/>
			<Stack.Screen name="KeySearchScreen" component={KeySearchScreen} 
				options={{
					title: "상호명 검색" ,
					headerBackTitle: "back"}}
			/>
			{/* headerStyle: {
						height:100, 
						backgroundColor: "rgba(190, 235, 255, 0.4)", 
						borderBottomColor: "#ccc", 
						borderBottomWidth:2 */}
			<Stack.Screen name="MapSearchResult" component={MapSearchResult}
				options={{headerShown: false}}
			/>
		</Stack.Navigator>
	)
}
export default MainStack