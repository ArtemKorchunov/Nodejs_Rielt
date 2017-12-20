function date_convert() {
    var date = new Date();
    var day = date.getDate();
    day = day > 9 ? day : "0" + day;
    var month = Number(date.getMonth()) + 1;
    month = month > 9 ? month : "0" + month;
    return  date.getFullYear() + "-" + month + "-" + day;

}