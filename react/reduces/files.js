export function files(state=[],action) {
    switch (action.type) {
        case "ADD_FILES_DATA":
            return [...action.data]
        case "PUSH_FILES_DATA":
            return [...state,...action.data]
        case "REMOVE_FILES":
            return [...state.filter((item)=>item.name!=action.data)]
        default :
            return state;
    }
}