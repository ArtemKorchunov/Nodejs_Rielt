module.exports = (sequelize, Datatypes) => {
    var Flat = sequelize.define("Flat", {
        flat_id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        city: {
            type: Datatypes.STRING(25),
            validate: {
                is: {
                    args: ["^([a-z]|[а-я]){2,20}$",'i'],
                    msg:  'City name must be higher than 1 symbol and lower 21'
                }
            }
        },
        street: {
            type: Datatypes.STRING(25),
            validate: {
                is: {
                    args: ["^([a-z]|[а-я]){2,20}$",'i'],
                    msg:  'Street name must be higher than 1 symbol and lower 21'
                }
            }
        },
        flat: {
            type: Datatypes.STRING(25),
            validate: {
                is: {
                    args: ["^([a-z]|[а-я]){2,20}$",'i'],
                    msg:  'Flat name must be higher than 1 symbol and lower 21'
                }
            }},
        room_amount: {
            type: Datatypes.INTEGER,
            validate: {
                min: {
                    args: 1,
                    msg: 'room amount must be greater than 0'
                },
                max: {
                    args: 8,
                    msg: 'room amount must be lower than 8'
                }
            }
        },
        stage: {
            type: Datatypes.INTEGER,
            validate: {
                min: {
                    args: 1,
                    msg: 'room amount must be greater than 0'
                },
                max: {
                    args: 250,
                    msg: 'room amount must be lower than 251'
                }
            }
        },
        total_floors: {
            type: Datatypes.INTEGER(2),
            validate: {
                min: {
                    args: 1,
                    msg: 'room floors must be greater than 0'
                },
                max: {
                    args: 99,
                    msg: 'room floors must be lower than 100'
                }
            }
        },
        size: {
            type: Datatypes.INTEGER(3),
            validate: {
                min: {
                    args: 8,
                    msg: 'room floors must be greater than 7'
                },
                max: {
                    args: 500,
                    msg: 'room floors must be lower than 501'
                }
            }
        }
    });
    Flat.associate = (models) => {
        models.Flat.belongsTo(models.Seller, {foreignKey: {name: "seller_id", allowNull:false}, onDelete: 'CASCADE'});
        models.Flat.hasMany(models.Soldout, {foreignKey: {name: "flat_id", allowNull: false}});
        models.Flat.hasMany(models.Rented, {foreignKey: {name: "flat_id", allowNull: false}});
    };
    return Flat;
};