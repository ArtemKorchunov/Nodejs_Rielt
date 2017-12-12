let searchSoldout = require('../public/js/joinModelsFindAll/searchSoldout');
let priority_del = require('./options_del');

module.exports = (offset, query, models,res) => {
    res.locals.offset1 = null;
    let priority = ['profile_id','term_of_contract','total_floors','stage','size', 'room_amount','street','price_of_realty'];
    let options_count = priority_del(query,priority);
    let count = options_count[1];
    let options = options_count[0];
    if (count) {
        return searchSoldout(models, options).then(
            matches_medium => {
                options = priority_del(query,priority)[0];
                let medium_length =  Object.keys(matches_medium).length;
                res.locals.offset1 = offset + medium_length;
                for (let key in matches_medium){
                    options.soldout_id.$notIn.push(matches_medium[key].soldout_id)
                }
                return searchSoldout(models, options).then(
                    matches_low => {
                         return Object.assign({},matches_medium, matches_low);
                    }
                  )
            }
        )
    } else {
        return new Promise((res,rej) => { res({})});
    }
};