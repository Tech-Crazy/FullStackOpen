import loginService from '../services/login'
import userService from '../services/users'

const reducer = (state = null, action) => {
    switch (action.type) {
        case "LOGIN":
            loginService.login(action.data)
            .then(token => {
                if (typeof token === String) {
                    return "ERROR"
                }
                else {
                    return action.user
                }
            })
        case "CREATE":
            userService.createUser(action.user)
            .then(newUser => "USER_CREATED")
            .catch(error => "ERROR_WHILE_CREATING_USER")
        default:
            return "NOT_LOGGED_IN"
    }
}

export const loginUser = user => {
    return {
        type: "LOGIN",
        user: user
    }
}

export const createUser = user => {
    return {
        type: "CREATE",
        user: user
    }
}

export default reducer