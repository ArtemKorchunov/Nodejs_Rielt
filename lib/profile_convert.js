module.exports = (item, data_convert) => {
    var result = {};
    for (let key in item) {
        if (key !== "user_username" && !(key.indexOf('id') + 1) ) {
            if (key === 'birthday') {
                result[key] = "Birthday: " +  data_convert(item[key])
            } else if (!item[key]){
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