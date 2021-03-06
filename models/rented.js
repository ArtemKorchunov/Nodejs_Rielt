module.exports = (sequelize, Datatypes) => {
    let Rented = sequelize.define("Rented", {
        rented_id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        price_for_month: {
            type: Datatypes.INTEGER,
            allowNull: false,
            validate: {
                min: {
                    args: 100,
                    msg: 'Price for month must be greater than 100'
                },
                max: {
                    args: 100000,
                    msg: 'room amount must be lower than 100000'
                }
            }
        },
        term_of_rented: {
            type: Datatypes.DATEONLY,
            validate: {
                isAfter: {
                    args: '2017-12-01',
                    msg: 'Term of rented must be higher than 2017-12-01'
                },
                isBefore: {
                    args: '2200-01-01',
                    msg: 'Term of rented must be lower than 2200-01-01'
                }
            },

        },
        full_time: {
            type: Datatypes.ENUM("1","0"),
            allowNull: false
        }
    }, {
        hooks: {
            beforeCreate : (instance, options) => {
                if (Number(instance.full_time)){
                    instance.term_of_rented = null;
                } else if (!instance.term_of_rented){
                    throw {errors: [{message: 'If you are choosing part time, please write down the date!', path: 'add-rented'}]};
                }
            },
            beforeUpdate:(instance, options) => {
                if (Number(instance.full_time)){
                    instance.term_of_rented = null;
                } else if (!instance.term_of_rented){
                    throw {errors: [{message: 'If you are choosing part time, please write down the date!', path: 'add-rented'}]};
                }
            }
        }
    });
    Rented.associate = (models) => {
        models.Rented.belongsTo(models.Flat, {foreignKey: {name: "flat_id" ,allowNull: false}});
        models.Rented.belongsTo(models.Profile, {foreignKey: {name: "profile_id" ,allowNull: false}});
        models.Rented.belongsTo(models.Customer, {foreignKey: { name: "customer_id", allowNull: false}, onDelete: 'CASCADE'});
    };
    return Rented;
};