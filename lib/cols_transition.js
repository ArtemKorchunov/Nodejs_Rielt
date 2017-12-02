models.exports = (items) => {
    let arr = [[]];
    let i = 0;
    let j = 0;
    items.forEach((item)=> {
        for (let key of item.attributes) {
            arr[i][j++] = item[key];
        }
        i++;
    });
    return arr;
};