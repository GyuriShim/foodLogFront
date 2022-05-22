import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import MainTab from "./MainTab"


const Stack = createStackNavigator()
const MainStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="main" component={MainTab} options={{headerShown: false}}/>
		</Stack.Navigator>
	)
}
export default MainStack