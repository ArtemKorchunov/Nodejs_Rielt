module.exports = (sequelize, Datatypes) => {
    let Customer = sequelize.define("Customer", {
        passportid: {
            type: Datatypes.STRING(8),
            primaryKey: true,
            allowNull: false
        },
        name: {type: Datatypes.STRING(25)},
        surname: {type: Datatypes.STRING(25)},
        last_name: {type: Datatypes.STRING(25)},
        birthday: {type: Datatypes.DATEONLY}
    });
    Customer.associate = (models) => {
        models.Customer.hasMany(models.Soldout, {foreignKey: { name: "cust_passportid", allowNull: false}});
        models.Customer.hasMany(models.Rented, {foreignKey: { name: "cust_passportid", allowNull: false}});
    };
    return Customer;
};