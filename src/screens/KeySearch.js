import React, {useContext, useState} from "react"
import { ScrollView, TextInput, StyleSheet, Text, View , PermissionsAndroid, } from "react-native"
import axios from "axios"
//import UploadScreen from "../screens/UploadScreen"
//import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import styled from "styled-components"
//import EmptySearchResult from "../components/EmptySearchResult"
//import SearchResult from "../components/SearchResult"
//import SearchContext from "../contexts/SearchContext"
import KeySearchHeader from "../components/KeySearchHeader"



const Container = styled.View` 
  flex: 1
  background-color: white //배경
`
const Box5= styled.View`
  flex: 3
  border-radius: 7px
  margin: 5px 10px
  background-color: white
  border: 2px rgba(164, 212, 234, 0.8)
` 
const styles = StyleSheet.create({
	block: {}
})
const requestPermission = async() => {
	try {
		if (Platform.OS == "android"){
			return await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
			)
		}
	} catch(e){
		console.log(e)
	}
}

function KeySearch ({navigation}) {
	//const [place, setPlace] = useState()
	//const {keyword} = useContext(SearchContext)

	/*if(keyword === ""){
		return <EmptySearchResult type="EMPTY_KEYWORD"/>
	} */
	const [locationObj, setLocationObj] = useState({})
	const placeSearch = async() => {
		try{
			await axios({
				//searching :"",
				url: "https://dapi.kakao.com/v2/local/search/keyword.json?y=37.514322572335935&x=127.06283102249932&radius=20000&query=카카오프렌즈",
				headers : {
					"Authorization": "KakaoAK a5511114012c0013be3072d88f677c4c", 
				}
				//place : requests.get(url, headers = headers).json()["documents"]
			}).then(res => 
			{//res.json())
				//.then(json => {
				// 받은 json으로 기능 구현
				console.log(res)
				const location = res.data.documents[0]
				setLocationObj({
					place_name
				})
				console.log(place_name)
			})
		}catch (error) {
			console.log(error)
		}
		/* ).then((res) => {
					console.log(res)
					const store = res.data.documents[0]
					setPlace({
						name:store.place_name,
					})
					console.log(store)
				})
		}  catch (error) {
			console.log(error)
		} */
		/*const keyPlace = res.data.documents[0]
			console.log(res.data.documents)
			setPlace(
				keyPlace.address.address_name
			)
			console.log(place)
		} */

		return(
			<Text>{}</Text> 
		)
    
	}
}

export default KeySearch