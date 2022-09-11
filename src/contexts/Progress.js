import React, { createContext, useState } from "react"

const ProgressContext = createContext({
	inProgress: false,
	spinner: () => {}
})

// eslint-disable-next-line react/prop-types
const ProgressProvider = ({children}) => {
	const [inProgress, setInProgress] = useState(false)
	const spinner = {
		start: () => setInProgress(true),
		stop: () => setInProgress(false)
	}
	const value = {inProgress, spinner}
	return(
		<ProgressContext.Provider value={value}>
			{children}
		</ProgressContext.Provider>
	)
}

export {ProgressContext, ProgressProvider}