module.exports = (item, changed_value,previous_value) => {
    if (changed_value && changed_value !== previous_value){
        if (item.service == "0"){
            return item.getRenteds().then(
                renteds => {
                    if (renteds.length !== 0){
                        throw new Error('You can\'t change service until deleting all renteds');
                    }
                }
            )
        }
        else {
            return item.getSoldouts().then(
                soldouts => {
                    if (soldouts.length !== 0) {
                        throw new Error('You can\'t change service until deleting all soldouts');
                    }
                }
            )
        }
    } else {
        return new Promise((resolve,reject)=>{resolve()})
    }
};