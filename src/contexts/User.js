import React, {createContext, useState} from "react"

const UserContext = createContext({
	user: false,
	dispatch: () => {}
})

// eslint-disable-next-line react/prop-types
const UserProvider = ({children}) => {
	const [user, setUser] = useState(false)
	const dispatch = (user) => {
		setUser(user)
	}
	const value = {user, dispatch}
	return(
		<UserContext.Provider value={value}>
			{children}
		</UserContext.Provider>
	)
}

const UserConsumer = UserContext.Consumer

export { UserProvider, UserConsumer}
export default UserContext