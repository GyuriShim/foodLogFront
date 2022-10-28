import React, {createContext, useState} from "react"

const SearchCategoryContext = createContext()

export function SearchCategoryContextProvider({children}){
	const [category, setCategory] = useState(0)

	return (
		<SearchCategoryContext.Provider value={{category, setCategory}}>
			{children}
		</SearchCategoryContext.Provider>
	)
}

export default SearchCategoryContext