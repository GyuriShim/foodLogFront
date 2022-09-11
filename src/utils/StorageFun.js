import AsyncStorage from "@react-native-async-storage/async-storage"

export const getItemFromAsync = async(storageName) => {
	try {
		await AsyncStorage.getItem(storageName, (err, result) => {
			const data = JSON.parse(result)
			console.log(data)
			return data
		})
	} catch (error) {
		console.log("불러오기 실패")
	}
}

export const setItemToAsync = async(storageName, item) => {
	try{
		await AsyncStorage.setItem(storageName, JSON.stringify(item), () => {
			console.log("save successfully")
		})
		
	}catch(e){
		console.log("save error : Asynce Storage")
	}
	
}

export const clearAll = async() => {
	try {
		await AsyncStorage.clear()
	} catch (e) {
		console.log("삭제 실패")
	}
}