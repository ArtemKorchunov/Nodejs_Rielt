module.exports = (sequelize, Datatypes) => {
    var Seller = sequelize.define("Seller", {
        seller_id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
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
                    msg:  'Seller name must be higher than 1 symbol and lower 16'
                }
            }
        },
        surname: {
            type: Datatypes.STRING(25),
            validate: {
                is: {
                    args: ["^([a-z]|[а-я]){2,15}$",'i'],
                    msg:  'Seller surname must be higher than 1 symbol and lower 16'
                }
            }},
        last_name: {
            type: Datatypes.STRING(25),
            validate: {
                is: {
                    args: ["^([a-z]|[а-я]){2,15}$",'i'],
                    msg:  'Seller last name must be higher than 1 symbol and lower 16'
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
    }, {
        classMethods: {
            getAll_val : () => {
                let arr = [];
                let i = 0;
                this.forEach(function (item) {
                    arr[i++] = item;
                });
                return arr;
            }
        },
        instanceMethods: {
            getObj_val: (sellers) => {
                let i = 0;
                let arr = [];
                sellers.forEach( (item)=> {
                    arr[i++] = item.getAll_val();
                });
                return arr;
            }
        }
    });

    Seller.associate = (models) => {
        models.Seller.hasMany(models.Flat, {foreignKey: {name: "seller_id", allowNull:false}});
    };
    return Seller;
};