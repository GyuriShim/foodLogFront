export const validateUsername = username => {
	const format = /^[a-zA-Z\d_.]{8,15}$/
	//const regex = /[&~\/\\!@#$%^*()`-=+[]{}\|:'"<>,\?]/g
	return format.test(username)
}

export const validateBirthday = birthday => {
	const format = /[0-9]{8}/
	return format.test(birthday)
}

export const removeWhitespace = text => {
	const format = /\s/g
	return text.replace(format, "")
}