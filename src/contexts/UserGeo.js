import React, {createContext, useState} from "react"

const UserGeoContext = createContext()

export function UserGeoContextProvider({children}){
	const [userGeo, setUserGeo] = useState(null)

	return (
		<UserGeoContext.Provider value={{userGeo, setUserGeo}}>
			{children}
		</UserGeoContext.Provider>
	)
}

export default UserGeoContext