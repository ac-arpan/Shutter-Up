const userReducer = (state, action) => {

    if(action.type === 'USER') {
        return {
            ...action.payload
        }
    } else if(action.type === 'LOGOUT') {
        return null
    }
    return state
}

export default userReducer