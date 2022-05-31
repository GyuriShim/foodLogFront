import { NavigationContainer } from "@react-navigation/native"
import React, {useState} from "react"
import AuthStack from "./AuthStack"
import MainStack from "./MainStack"

const Navigation = () => {
	const [login, setLogin] = useState(true)

	return(
		<NavigationContainer>
			{login ? <MainStack /> : <AuthStack />}
		</NavigationContainer>
	)
}

export default Navigation