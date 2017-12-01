module.exports = (sequelize, Datatypes) => {
    var Soldout = sequelize.define("Soldout", {
        soldout_id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        price_of_realty: {
            type: Datatypes.INTEGER,
            validate: {
                min: {
                    args: 1000,
                    msg: 'Price for realty must be greater than 1000'
                },
                max: {
                    args: 100000,
                    msg: 'room amount realty be lower than 100000'
                }
            }
        },
        term_of_lease: {
            type: Datatypes.DATEONLY,
            validate: {
                isAfter: {
                    args: '2017-12-01',
                    msg: 'Term of lease must be higher than 2017-12-01'
                },
                isBefore: {
                    args: '2200-01-01',
                    msg: 'Term of lease must be lower than 2200-01-01'
                }
            }
        },
        deposit_money: {type: Datatypes.INTEGER }
    });
    Soldout.associate = (models) => {
        models.Soldout.belongsTo(models.Flat, {foreignKey: {name: "flat_id", allowNull: false}});
        models.Soldout.belongsTo(models.Profile, {foreignKey: {name: "profile_id", allowNull: false}});
        models.Soldout.belongsTo(models.Customer, {foreignKey: { name: "cust_id", allowNull: false}, onDelete: 'CASCADE'});
    };
    return Soldout;
};