exports.post = (req, res, next) => {
    let model = req.params.table_name;
    let id = req.body.id;
    let models  = req.app.get('models');
    let this_model = models[model];
    this_model.findById(id).then(
        (item) =>{
            item.destroy().then(
                result => {
                    res.send({message: `${model} has been changed successful!` ,redir_to: `add-${model.toLowerCase()}`});
                },
                err => {
                    res.status(403).send({message: 'Something went wrong!'});
                }
            );
        },
        err => {
            res.status(403).send({message: 'Something went wrong!'});
        }
    );

};