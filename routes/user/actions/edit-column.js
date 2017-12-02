exports.post = (req, res, next) => {
    let model = req.params.table_name;
    let id = req.params.id;
    let models  = req.app.get('models');
    let this_model = models[model];
    this_model.findById(id).then(
        (item) =>{
            item.update(req.body.validate_obj).then(
                result => {
                    res.send({message: `${model} has been changed successful!` ,redir_to: `add-${model.toLowerCase()}`});
                },
                err => {
                    let path = err.errors[0].path;
                    let message = err.errors[0].message;
                    res.status(403).send({message: message, path: path});
                }
            );
        },
        err => {
            res.status(403).send({message: 'Something went wrong!'});
        }
    );

};