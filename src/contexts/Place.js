import React, {createContext, useState} from "react"

const PlaceInfoContext = createContext()

export function PlaceInfoContextProvider({children}){
	const [placeInfo, setPlaceInfo] = useState()

	return (
		<PlaceInfoContext.Provider value={{placeInfo, setPlaceInfo}}>
			{children}
		</PlaceInfoContext.Provider>
	)
}

export default PlaceInfoContext