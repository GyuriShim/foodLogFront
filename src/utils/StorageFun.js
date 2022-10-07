import AsyncStorage from "@react-native-async-storage/async-storage"

const isEmpty = function (value) {
	if (value === "" || value === null || value === undefined || (value !== null && typeof value === "object" && !Object.keys(value).length)) {
		return true
	} else {
		return false
	}
}
  
// AsyncStorage get 함수 모듈
export const getItemFromAsync = (storageName) => {
	if (isEmpty(storageName)) {
		throw Error("Storage Name is empty")
	}
	
	return new Promise((resolve, reject) => {
		AsyncStorage.getItem(storageName, (err, result) => {
			if (err) {
				reject(err)
			}
		
			if (result === null) {
				resolve(null)
			}
			console.log(result)
			resolve(JSON.parse(result))
			
		})
	})
}
  
// AsyncStorage set 함수 모듈
export const setItemToAsync = (storageName, item) => {
	if (isEmpty(storageName)) {
		throw Error("Storage Name is empty")
	}
  
	return new Promise((resolve, reject) => {
		AsyncStorage.setItem(storageName, JSON.stringify(item), (error) => {
			if (error) {
				reject(error)
			}

			resolve("입력 성공")
		})
	})
}

// export const getItemFromAsync = async(storageName) => {
// 	try {
// 		await AsyncStorage.getItem(storageName, (err, result) => {
// 			const data = JSON.parse(result)
// 			console.log(data)
// 		})
// 	} catch (error) {
// 		console.log("불러오기 실패")
// 	}
// }

// export const setItemToAsync = async(storageName, item) => {
// 	try{
// 		await AsyncStorage.setItem(storageName, JSON.stringify(item))
// 		console.log("save successfully")
// 	} catch (e){
// 		console.log("save error : Asynce Storage")
// 	}
	
// }

export const clearAll = async() => {
	try {
		await AsyncStorage.clear()
	} catch (e) {
		console.log("삭제 실패")
	}
}