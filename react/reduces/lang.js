if(document.getElementById('fileupload').getAttribute('lang').toLowerCase()==="ru"){
    var langConfig = require('./../lang/ru');
}

else {
    var langConfig = require('./../lang/en');
}

export function lang(state=Object.assign({},langConfig),action) {
    switch (action.type) {
        default :
            return state;
    }
}