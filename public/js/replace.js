module.exports.replace_objPurpes_PlusToLower = (obj) => {
    for (var key in obj) {
        let tempor = obj[key];
        delete obj[key];
        let to = key.replace(/\s/ig,'_').toLowerCase();
        obj[to] = tempor;
    }
    return obj;
};