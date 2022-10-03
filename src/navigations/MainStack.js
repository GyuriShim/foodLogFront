import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import MainTab from "./MainTab"
import SearchScreen from "../screens/SearchScreen"
import SearchHeader from "../components/SearchHeader"
import Follower from "../screens/Follower"
import Following from "../screens/Following"
import SubSearch from "../screens/SubSearch"
import SubSearchHeader from "../components/SubSearchHeader"
import AccountScreen from "../screens/AccountScreen"

const Stack = createStackNavigator()
const MainStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				cardStyle: {backgroundColor: "white"}
			}}
		>
			<Stack.Screen name="main" component={MainTab} options={{headerShown: false}}/>
			<Stack.Screen 
				name="search" 
				component={SearchScreen} 
				options={{
					title: "검색",
					headerTitle: () => <SearchHeader />,
					headerStyle: {
						height:100, 
						backgroundColor: "rgba(190, 235, 255, 0.4)", 
						borderBottomColor: "#ccc", 
						borderBottomWidth:2
					},
				}}/>
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
				options={{
					headerTitle: () => <SubSearchHeader/>,
					headerStyle: {
						height: 55,
						borderBottomWidth: 1,
						borderBottomColor: "#ccc",
					},
					
				}}
			/>
			<Stack.Screen
				name="account"
				component={AccountScreen}
				options={{title: "계정 아이디"}}
			/>
		</Stack.Navigator>
		
	)
}
export default MainStack