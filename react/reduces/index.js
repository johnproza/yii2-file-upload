import {combineReducers} from 'redux';
import {folders} from './folders';
import {files} from './files';
const listReducer = combineReducers({
    folders,
    files
})

export default listReducer;