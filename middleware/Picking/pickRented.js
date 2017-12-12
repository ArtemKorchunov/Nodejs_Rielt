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
                let offset = matches.length;
                relatedMatches(offset,query,models,res).then(
                    result => {
                        res.locals.searched = true;
                        matches = Array.from(matches,result[0],result[1]);
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