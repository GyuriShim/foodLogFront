export const validateUsername = username => {
	const format = /^[a-zA-Z\d_.]{8,15}$/
	//const regex = /[&~\/\\!@#$%^*()`-=+[]{}\|:'"<>,\?]/g
	return format.test(username)
}

export const validateBirthday = birthday => {
	const format = /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
	return format.test(birthday)
}

export const removeWhitespace = text => {
	const format = /\s/g
	return text.replace(format, "")
}