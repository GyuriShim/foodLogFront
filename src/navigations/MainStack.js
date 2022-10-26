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
import { Pressable } from "react-native"
import SubSearchContext from "../contexts/SubSearchContext"
import { AntIcon } from "../assets/icons/AntIcon"
import SearchContext from "../contexts/SearchContext"

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
			<Stack.Screen name="upload" component={UploadScreen}
				//options={{title: "new post", headerBackTitle: "back"}}
			/>
			<Stack.Screen name="PostScreen" component={PostScreen}
				options={{title: "게시물", headerBackTitle: "back"}}/>
			<Stack.Screen name="Modify" component={ModifyProfile}
				options={{headerShown: false}}
			/>
		</Stack.Navigator>
	)
}
export default MainStack