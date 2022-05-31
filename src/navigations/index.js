import { NavigationContainer } from "@react-navigation/native"
import React, {useState} from "react"
import { SearchContextProvider } from "../contexts/SearchContext"
import AuthStack from "./AuthStack"
import MainStack from "./MainStack"

const Navigation = () => {
	const [login, setLogin] = useState(true)

	return(
		<NavigationContainer>
			<SearchContextProvider>
				{login ? <MainStack /> : <AuthStack />}
			</SearchContextProvider>
		</NavigationContainer>
	)
}

export default Navigation