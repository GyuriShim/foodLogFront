import React, { useContext, useEffect, useState } from "react"
import { Button, ScrollView, View, Text } from "react-native"
import styled from "styled-components"
import RcmdPost from "../components/RcmdPost"
import PurposeContext from "../contexts/Purpose"
import { recommend } from "../service/recommend"

const Container = styled.View`
    align-items: center
    background-color: white
	padding-horizontal: 15px
`
const StyledText = styled.Text`
    font-size: 30px
    margin-bottom: 10px
`
const RcmdScreen = ({navigation}) => {
	const {value} = useContext(PurposeContext)
	const [content, setContent] = useState([])

	const recommendAxios = async(foodPurpose) => {
		await recommend(foodPurpose)
			.then(response => {
				if(response){
					console.log(response.data)
					console.log("recommend post success")
					setContent(response.data.content)
				}
			})
			.catch((error)=> {
				console.log(error)
			})
	}

	useEffect(() => {
		recommendAxios(value)
	},[value])

	return(
		<>
			<Container>
			</Container>	
			<ScrollView style={{paddingHorizontal: 15, backgroundColor: "white"}}>
				{content.map((content, key) =>{
					key = content.postId
					return (
						<View>
							<RcmdPost onPress={() => 
							navigation.navigate("PostScreen")} 
							item={{imageUrl: content.picture, store:"퍼미닛 커피", address:"경기도 성남시", contents:content.review, rating: content.rating}}
							/>
						</View>	
					)
				})}
			</ScrollView>
		</>
		
	)
}
export default RcmdScreen
