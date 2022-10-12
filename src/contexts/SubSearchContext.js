import React, {createContext, useState} from "react"

const SubSearchContext = createContext()

export function SubSearchContextProvider({children}){
	const [userKeyword, onChangeSearchText] = useState("")

	return (
		<SubSearchContext.Provider value={{userKeyword, onChangeSearchText}}>
			{children}
		</SubSearchContext.Provider>
	)
}

export default SubSearchContext