module.exports = (sequelize, Datatypes) => {
    var Soldout = sequelize.define("Soldout", {
        soldout_id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        price_of_realty: { type: Datatypes.FLOAT},
        term_of_lease: {type: Datatypes.DATE },
        deposit_money: {type: Datatypes.INTEGER }
    });
    Soldout.associate = (models) => {
        models.Soldout.belongsTo(models.Flat, {foreignKey: {name: "flat_id" }});
        models.Soldout.belongsTo(models.Profile, {foreignKey: {name: "profile_id", allowNull: false}});
        models.Soldout.belongsTo(models.Customer, {foreignKey: { name: "cust_passportId"}});
    };
    return Soldout;
};