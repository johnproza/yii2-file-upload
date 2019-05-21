import React, {Component, Suspense} from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import listReducer from './reduces/index';
import ReactDOM from 'react-dom';
const Tree = React.lazy(()=>import(/* webpackChunkName: "note-tree" */ './module/tree'));
const store = createStore(listReducer);
document.getElementById('fileupload')!=null ? ReactDOM.render(
    <Suspense fallback="Загрузка данных">
        <Provider store={store}>
            <Tree />
        </Provider>
    </Suspense>,document.getElementById('fileupload')
) : null;

