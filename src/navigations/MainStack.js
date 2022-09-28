import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import MainTab from "./MainTab"
import UploadScreen from "../screens/UploadScreen"
import PostScreen from "../screens/PostScreen"

const Stack = createStackNavigator()
const MainStack = () => {
	return (
		
		<Stack.Navigator
			screenOptions={{
				cardStyle: {backgroundColor: "white"}
			}}
		>
			<Stack.Screen name="main" component={MainTab} options={{headerShown: false}}/>
			<Stack.Screen name="upload" component={UploadScreen}
				//options={{title: "new post", headerBackTitle: "back"}}
			/>
			<Stack.Screen name="PostScreen" component={PostScreen}
				options={{title: "게시물", headerBackTitle: "back"}}/>
		</Stack.Navigator>
		
	)
}
export default MainStack