module.exports = (query,priority) => {
    let options = query['validate_obj'];
    let matched_options = Object.keys(options);
    let i = 0;
    let count = 0;
    for (let key in matched_options){
        if (count > 3 || key === matched_options.length - 1) {break;}
        if (matched_options.includes(priority[i])){
            delete options[priority[i]];
            count++;
        }
        i++;
    }
    return [options,count];
};