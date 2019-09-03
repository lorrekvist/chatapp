export const setToken = (token) => {
    localStorage.setItem('passToken', token)
}

export const getToken = () => {
    return localStorage.getItem('passToken')
}

export const isLoggedIn = () => {
    if (getToken()) {
        return true
    } else {
        return false
    }
}

export const logout = () => {
    localStorage.removeItem('passToken')
}

//Exercise - Add funtionality to check if token has expired or not