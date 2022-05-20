import React from "react"
import { createStackNavigator } from "react-navigation/stack"
import mapscreen from "../screens/Mapscreen"
import rcmdscreen from "../screens/rcmdscreen"
import uploadscreen from "../screens/uploadscreen"
import subscreen from "../screens/subscreen"
import accountscreen from "../screens/accountscreen"

const Stack = createStackNavigator()
const StackNavigation = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="mapscreen" component={mapscreen} />
			<Stack.Screen name="rcmdscreen" component={rcmdscreen} />
			<Stack.Screen name="uploadscreen" component={uploadscreen} />
			<Stack.Screen name="accountscreen" component={accountscreen} />
			<Stack.Screen name="subscreen" component={subscreen} />
		</Stack.Navigator>
	)
}
export default StackNavigation