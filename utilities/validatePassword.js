// No puede tener espacios ni mas de 20 caracteres. Debe contener al menos 8 caracteres, 1 minuscula, 1 mayuscula y 1 numero
const validatePassword = (password)=> {
    if (password.length < 8) {
        return true
    } else if (password.length > 20) {
        return true
    } else if (/\s/g.test(password)) {
        return true
    } else if (/\W/g.test(password)) {
        return true
    } else if (!/[a-z]/g.test(password)) {
        return true
    } else if (!/[A-Z]/g.test(password)) {
        return true
    } else if (!/[0-9]/g.test(password)) {
        return true
    }
    return false
}

module.exports = validatePassword