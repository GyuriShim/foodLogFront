import React from "react"
import {StatusBar} from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import MapScreen from "../screens/MapScreen"
import RcmdScreen from "../screens/RcmdScreen"
import UploadScreen from "../screens/UploadScreen"
import SubScreen from "../screens/SubScreen"
import AccountScreen from "../screens/AccountScreen"
import { AntIcon } from "../assets/icons/AntIcon"
import { Location } from "../assets/icons/Location"
import { OcticonsIcon } from "../assets/icons/OcticonsIcon"

const Tab = createBottomTabNavigator()

const MainTab = () => {
	return (
		<>
			<StatusBar backgroundColor="white" barStyle="dark-content"/>
			<Tab.Navigator
				screenOptions={{
					tabBarHideOnKeyboard: true,
					tabBarInactiveTintColor: "black",
					tabBarStyle:[
						{
							backgroundColor: "rgb(216, 243, 255)",
							borderTopColor: "rgb(216, 243, 255)",
							borderBottomColor: "rgb(216, 243, 255)",
							borderTopWidth: 2,
							borderBottomWidth: 2,
							height: 58
						},
						null
					]
				}}
			>	
				<Tab.Screen name="지도" component={MapScreen} options={{headerShown:false, tabBarIcon: props => Location({...props, name:"location-outline", size: 24})}}/>
				<Tab.Screen name="추천" component={RcmdScreen} options={{tabBarIcon: props => AntIcon({...props, name:"like2"})}}/>
				<Tab.Screen name="업로드" component={UploadScreen} options={{tabBarIcon: props => AntIcon({...props, name:"pluscircleo"})}}/>
				<Tab.Screen 
					name="구독" 
					component={SubScreen} 
					options={{
						tabBarIcon: props => OcticonsIcon({...props, name:"people"}), 
						title: "구독자 게시물", 
						headerTitleStyle: {
							fontSize: 16
						}
					}}/>
				<Tab.Screen name="내 계정" component={AccountScreen} options={{headerShown:false, tabBarIcon: props => OcticonsIcon({...props, name:"person"})}}/>
			</Tab.Navigator>
		</>
	)
}

export default MainTab