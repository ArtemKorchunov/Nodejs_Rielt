
module.exports = (req,res,next) => {
    let models  = req.app.get('models');
    let this_model = models.User;
    this_model.findAll({
        where: {
            right_level: 1
        }
    }).then(
        items => {
            //todo refactor this
            if(req.url.indexOf('add-soldout') + 1) {
                res.locals.Users = items;
            } else if (req.url.indexOf('add-rented') + 1) {
                res.locals.Users = items;
            }
            else {
                req.tableName = this_model.name;
                res.locals.Cols = items;
            }
            next();
        }
    );

};