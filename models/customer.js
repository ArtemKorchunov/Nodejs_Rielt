module.exports = (sequelize, Datatypes) => {
    let Customer = sequelize.define("Customer", {
        customer_id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        passportid: {
            type: Datatypes.STRING(8),
            unique: true,
            validate: {
                is: {
                    args: ["^(([A-Z]{2})|([А-Я]{2})){1}[1-9]{6}$",'ig'],
                    msg: 'The format of passport must be like AA111111'
                }
            }
        },
        name: {
            type: Datatypes.STRING(25),
            validate: {
                is: {
                    args: ["^([a-z]|[а-я]){2,15}$",'i'],
                    msg:  'Customer name must be higher than 1 symbol and lower 16'
                }
            }
        },
        surname: {
            type: Datatypes.STRING(25),
            validate: {
                is: {
                    args: ["^([a-z]|[а-я]){2,15}$",'i'],
                    msg:  'Customer surname must be higher than 1 symbol and lower 16'
                }
            }},
        last_name: {
            type: Datatypes.STRING(25),
            validate: {
                is: {
                    args: ["^([a-z]|[а-я]){2,15}$",'i'],
                    msg:  'surname last name must be higher than 1 symbol and lower 16'
                }
            }
        },
        birthday: {
            type: Datatypes.DATEONLY,
            validate: {
                isAfter: {
                    args: '1910-01-01',
                    msg: 'Your age must be higher than 1910-01-01'
                },
                isBefore: {
                    args: '2000-01-01',
                    msg: 'Your age must be lower than 2000-01-01'
                }
            }
        }
    });
    Customer.associate = (models) => {
        models.Customer.hasMany(models.Soldout, {foreignKey: { name: "customer_id"}});
        models.Customer.hasMany(models.Rented, {foreignKey: { name: "customer_id"}});
    };
    return Customer;
};