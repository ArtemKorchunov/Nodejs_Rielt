module.exports = (query,priority) => {
    let options = query['validate_obj'];
    let matched_options = Object.keys(options);
    let i = 0;
    let count = 0;
    for (let key in priority){
        if (count > 3 || key === matched_options.length - 1) {break;}
        if (matched_options.includes(priority[key])){
            count++;
            delete options[priority[key]];
        }
    }
    return [options,count];
};