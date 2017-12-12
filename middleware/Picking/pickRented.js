let assignSearchRented =  require('../../public/js/assignModel/searchRented');
let dateConvert = require("../../lib/dateConvert");
let searchRented = require('../../public/js/joinModelsFindAll/searchRented');
let relatedMatches = require('../../lib/relatedMatchesRented');

module.exports = (req, res, next) => {
    res.locals.searched = false;
    res.locals.type = 'rented';
    res.locals.matches_cols = [];
    if (!req.query['validate_obj']){
        next();
    }
    else {
        let models = req.app.get('models');
        let obj = req.query['validate_obj'];
        if (obj['full_time'].$like === "%1%") {
            obj['term_of_rented'] = {
                $eq: null
            }
        }
        searchRented(models,obj).then(
            matches => {
                res.locals.offset0 = Object.keys(matches).length;
                let req = res.req;
                let models = req.app.get('models');
                let query = req.query;
                let arr_id = [];
                for (let key in matches){
                    arr_id.push(matches[key].soldout_id)
                }
                query['validate_obj'].rented_id = {$notIn: arr_id};
                let offset = res.locals.offset0;
                relatedMatches(offset,query,models,res).then(
                    result => {
                        res.locals.searched = true;
                        for (let res_key in result){
                            matches.push(result[res_key]);
                        }
                        res.locals.matches_cols = assignSearchRented(dateConvert(matches));
                        next();
                    }
                );
            },
            err => {
                next()
            }
        );
    }
};