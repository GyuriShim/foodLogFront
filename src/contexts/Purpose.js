import React, {createContext, useState} from "react"

const PurposeContext = createContext()

export function PurposeContextProvider({children}){
	const [value, setValue] = useState(null)

	return (
		<PurposeContext.Provider value={{value, setValue}}>
			{children}
		</PurposeContext.Provider>
	)
}

export default PurposeContext