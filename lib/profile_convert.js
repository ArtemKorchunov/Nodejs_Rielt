module.exports = (item) => {
    var result = {};
    for (let key in item.get()) {
        if (key !== "user_username" && !(key.indexOf('id') + 1) ) {
            if (!item[key]){
                result[key] = key + ": " + "empty";
            } else {
                result[key] = key + ": " + item[key];
            }
        }
    }
    delete result.createdAt;
    delete result.updatedAt;
    return result;
};