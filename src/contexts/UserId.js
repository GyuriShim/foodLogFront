import React, {createContext, useState} from "react"

const UserIdContext = createContext()

export function UserIdContextProvider({children}){
	const [userId, setUserId] = useState(null)

	return (
		<UserIdContext.Provider value={{userId, setUserId}}>
			{children}
		</UserIdContext.Provider>
	)
}

export default UserIdContext