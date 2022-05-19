import React, {useState, useEffect} from "react"
import AddInfo from "./screens/AddInfo"
import Loading from "./screens/Loading"
//import Login from "./screens/Login"

const App = () => {
	const [ready, setReady] = useState(true)
	useEffect(()=>{
		//뒤의 1000 숫자는 1초를 뜻함
		//2초 뒤에 실행되는 코드들이 담겨 있는 함수     
		setTimeout(()=>{         
			//setState(data)
			setReady(false) 
		},2000)
	},[]) 
	return ready ? <Loading /> : <AddInfo />
}

export default App