import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import MainTab from "./MainTab"
import UploadScreen from "../screens/UploadScreen"

const Stack = createStackNavigator()
const MainStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="main" component={MainTab} options={{headerShown: false}}/>
			<Stack.Screen name="upload" component={UploadScreen}
				options={{title: "new post", headerBackTitle: "back"}}
			/>
		</Stack.Navigator>
	)
}
export default MainStack