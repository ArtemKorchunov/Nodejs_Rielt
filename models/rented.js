module.exports = (sequelize, Datatypes) => {
    var Rented = sequelize.define("Rented", {
        rented_id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        price_for_moth: {type:  Datatypes.INTEGER},
        term_of_lease: {type: Datatypes.DATE},
        full_time: {type: Datatypes.ENUM("1","0")}
    });
    Rented.associate = (models) => {
        models.Rented.belongsTo(models.Flat, {foreignKey: {name: "flat_id" ,allowNull: false}});
        models.Rented.belongsTo(models.Profile, {foreignKey: {name: "profile_id" ,allowNull: false}});
        models.Rented.belongsTo(models.Customer, {foreignKey: { name: "cust_passportId", allowNull: false}});
    };
    return Rented;
};