export function folders(state=[],action) {
    switch (action.type) {
        case "ADD_FOLDER_DATA":
            return [...action.data]
        case "REMOVE_FOLDER":
            console.log(action.data);
            return [...state.filter((item)=>item.name!=action.data)]
        case "CREATE_FOLDER":
            return [...state,{createAt:new Date(),name:action.data.name,path:action.data.path,size:0}]
        default :
            return state;
    }
}