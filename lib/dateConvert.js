
module.exports = (items) => {
    if (!items || items.length === 0) { return []}
    let findfor = items[0];

    if (findfor['term_of_lease']){
        findfor = 'term_of_lease';
    }
    else if (findfor['full_time']){
        findfor = 'term_of_rented';
    }
    else if (findfor['birthday']){
        findfor = 'birthday';
    }
    items.forEach( (item) => {
        if (item[findfor]) {
            let date = item[findfor];
            date = new Date(date);
            let day = date.getDate();
            day = day > 9 ? day : "0" + day;
            let month = Number(date.getMonth()) + 1;
            month = month > 9 ? month : "0" + month;
            item[findfor] = date.getFullYear() + "-" + month + "-" + day;
        }
    });
    return items;
};