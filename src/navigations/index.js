import { NavigationContainer } from "@react-navigation/native"
import React, {useContext} from "react"
import Spinner from "../components/Spinner"
import { ProgressContext } from "../contexts/Progress"
import UserContext from "../contexts/User"
import { SearchContextProvider } from "../contexts/SearchContext"
import AuthStack from "./AuthStack"
import MainStack from "./MainStack"

const Navigation = () => {
	const {user} = useContext(UserContext)
	const {inProgress} = useContext(ProgressContext)

	return(
		<NavigationContainer>
			<SearchContextProvider>
				{user ? <MainStack /> : <AuthStack />}
				{inProgress && <Spinner />}
			</SearchContextProvider>
		</NavigationContainer>
	)
}

export default Navigation