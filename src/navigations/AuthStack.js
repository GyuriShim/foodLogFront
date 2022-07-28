import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import Login from "../screens/Login"
import AddInfo from "../screens/AddInfo"

const Stack = createStackNavigator()

const AuthStack = () => {
	return (
		<Stack.Navigator
			initialRouteName="Login"
		>
			<Stack.Screen
				name="Login"
				component={Login}
				options={{headerShown: false}}
			/>
			<Stack.Screen 
				name="Signup"
				component={AddInfo}
				options={{headerShown: false}}
			/>
		</Stack.Navigator>
	)
}

export default AuthStack