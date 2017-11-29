
module.exports = (req,res,next) => {
    let models  = req.app.get('models');
    models.User.findAll({
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
                res.locals.Cols = items;
            }
            next();
        },
        err => {
            res.locals.Cols =  [];
            next()
        }
    );

};