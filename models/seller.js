module.exports = (sequelize, Datatypes) => {
    var Seller = sequelize.define("Seller", {
        passportId: {
            type: Datatypes.STRING(8),
            primaryKey: true,
            allowNull: false
        },
        name: {type: Datatypes.STRING(25)},
        surname: {type: Datatypes.STRING(25)},
        lastname: {type: Datatypes.STRING(25)},
        date_of_birth: {type: Datatypes.DATE}
    });

    Seller.associate = (models) => {
        models.Seller.hasMany(models.Flat, {foreignKey: {name: "seller_passportId"}})
    };
    return Seller;
};