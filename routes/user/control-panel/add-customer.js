exports.get = function(req, res, next) {
    res.render('user/control-panel/forms/add-customer',
        {
            ColumnName: [ ['PassportId','text'],['Name','text'],['Surname','text'],['Last name','text'], ['Birthday','date']],
            tableName: req.tableName
        }
    );
};
exports.post = (req, res, next) => {
    let models  = req.app.get('models');
    if (req.all_filled){
        models.Customer.create(req.validate_obj).then(
            customer => {
                if (req.body.solve_deal){
                    let solve_deal = req.body.solve_deal;
                    let deal_id = req.body.deal_id;
                    let deal_model = models[solve_deal];
                    solve_deal = solve_deal.toLowerCase();
                    let customer_id = customer["customer_id"];
                    deal_model.findById(deal_id).then(
                        item => {
                            item.update({customer_id : customer_id}).then(
                                success => {
                                    res.send({message:"Customer has been created successful!" ,redir_to: "add-"+ solve_deal});
                                },
                                err => {
                                    res.status(403).send({message: 'Something went wrong!'});
                                }
                            )
                        }
                    );
                } else {
                    res.send({message:"Customer has been created successful!" ,redir_to: "add-customer"})
                }
            },
            err => {
                let path = err.errors[0].path;
                let message = err.errors[0].message;
                res.status(403).send({message: message, path: path});
            }
        )
    } else {
        res.status(403).send({message: 'All fields must be completed!'});
    }
};
