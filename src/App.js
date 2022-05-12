import React, {useState, useEffect} from "react"
import {View, Text} from "react-native"
import Loading from "./components/Loading"

const App = () => {
	const [ready, setReady] = useState(true)
	useEffect(()=>{
		//뒤의 1000 숫자는 1초를 뜻함
		//1초 뒤에 실행되는 코드들이 담겨 있는 함수     
		setTimeout(()=>{         
			//setState(data)
			setReady(false) 
		},2000)
	},[]) 
	return ready ? <Loading /> : (
		<View 
			style={{
				flex: 1,
				backgroundColor: "#ffffff",
				alignItems: "center",
				justifyContent: "center",
			}}>
			<Text
				style={{
					color: "#2f5d9a",
					fontSize: 48,
					fontWeight: "600",
					paddingBottom: 300,
					fontFamily: "Multicolore Pro"
				}}
			>
				Food{"\n"}Log</Text>
		</View>
	)
}

export default App