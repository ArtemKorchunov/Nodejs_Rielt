let assignSearchSoldout =  require('../../public/js/assignModel/searchSoldout');
let dateConvert = require("../../lib/dateConvert");
let searchSoldout = require('../../public/js/joinModelsFindAll/searchSoldout');
let relatedMatches = require('../../lib/relatedMatchesSoldout');

module.exports = (req, res, next) => {
    res.locals.searched = false;
    res.locals.type = 'soldout';
    res.locals.matches_cols = [];
    if (!req.query['validate_obj']){
        next();
    }
    else {
        let models = req.app.get('models');
        let obj = req.query['validate_obj'];
        searchSoldout(models, obj).then(
            matches => {
                res.locals.offset0 = Object.keys(matches).length;
                let req = res.req;
                let models = req.app.get('models');
                let query = req.query;
                let offset = matches.length;
                relatedMatches(offset,query,models,res).then(
                    result => {
                        res.locals.searched = true;
                        matches = Array.from(new Set([matches,result[0],result[1]]));
                        res.locals.matches_cols = assignSearchSoldout(dateConvert(matches));
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