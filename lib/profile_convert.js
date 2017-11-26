module.exports = (items, data_convert) => {
    var result = {};
    for (let key in items) {
        if (key !== "user_username" &&  key !== "id_profile") {
            if (key === 'date_of_birth') {
                result[key] = "Birthday: " +  data_convert(items[key])
            } else if (!items[key]){
                result[key] = key + ": " + "empty";
            } else {
                result[key] = key + ": " + items[key];
            }
        }
    }
    delete result.createdAt;
    delete result.updatedAt;
    return result;
};