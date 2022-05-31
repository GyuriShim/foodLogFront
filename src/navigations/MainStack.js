import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import MainTab from "./MainTab"
import SearchScreen from "../screens/SearchScreen"
import SearchHeader from "../components/SearchHeader"


const Stack = createStackNavigator()
const MainStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="main" component={MainTab} options={{headerShown: false}}/>
			<Stack.Screen 
				name="search" 
				component={SearchScreen} 
				options={{
					title: "검색",
					headerTitle: () => <SearchHeader />
				}}/>
		</Stack.Navigator>
	)
}
export default MainStack