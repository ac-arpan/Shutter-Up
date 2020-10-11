const userReducer = (state, action) => {

    if(action.type === 'USER') {
        return {
            ...action.payload
        }
    } else if(action.type === 'LOGOUT') {
        return null
    } else if(action.type === 'UPDATE_DP') {
        return {
            ...state,
            photo: action.payload
        }
    }
    return state
}

export default userReducer