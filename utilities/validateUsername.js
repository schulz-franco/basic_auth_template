const validateUsername = (username)=> {
    if (username.includes(' ')) {
        return true
    } else if (username.length < 6 || username.length > 16) {
        return true
    } else if (/\W/g.test(username)) {
        return true
    }
    return false
}

module.exports = validateUsername