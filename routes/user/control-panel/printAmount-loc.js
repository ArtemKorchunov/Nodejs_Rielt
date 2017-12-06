exports.post = (req,res,next) => {
    let models = req.app.get('models');
    let sequelize = models.sequelize;
    let Profile = models.Profile;
    models.Profile.findAll({
        attributes: ['work_location', [sequelize.fn('COUNT', sequelize.col('profile_id')), 'amount_agents']],
        group: 'work_location'
    }).then(
        result => {
            res.send({})
        },
        err => {
            res.send({})
        }

    )
};