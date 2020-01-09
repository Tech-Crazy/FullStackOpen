const reducer = (state = {visible: false}, action) => {
    switch (action.type) {
        case "TOGGLE":
            return {visible: !state.visible}
        default:
            return {visible: false}
    }
}

export const toggleVisibility = () => {
    return {
        type: "TOGGLE"
    }
}

export default reducer