import {combineReducers} from 'redux';
import {folders} from './folders';
import {files} from './files';
import {lang} from './lang';
const listReducer = combineReducers({
    folders,
    files,
    lang
})

export default listReducer;