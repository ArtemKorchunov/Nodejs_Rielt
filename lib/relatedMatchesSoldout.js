let searchSoldout = require('../public/js/joinModelsFindAll/searchSoldout');
let priority_del = require('./options_del');

module.exports = (offset, query, models,res) => {
    let priority = ['profile_id','term_of_contract','total_floors','stage','street','size', 'room_amount','price_of_realty'];
    let options_count = priority_del(query,priority);
    let count = options_count[1];
    let options = options_count[0];
    if (count) {
        return searchSoldout(models, options, offset).then(
            matches_medium => {
                options = priority_del(query,priority);
                let medium_length =  Object.keys(matches_medium).length;
                res.locals.offset1 = offset + medium_length;
                return searchSoldout(models, options, offset+= medium_length).then(
                    matches_low => {
                         return [matches_medium, matches_low];
                    }
                  )
            }
        )
    } else {
        return new Promise((res,rej) => { res({})});
    }
};