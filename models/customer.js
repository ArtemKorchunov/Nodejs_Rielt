module.exports = (sequelize, Datatypes) => {
    let Customer = sequelize.define("Customer", {
        passportId: {
            type: Datatypes.STRING(8),
            primaryKey: true,
            allowNull: false
        },
        name: {type: Datatypes.STRING(25)},
        surname: {type: Datatypes.STRING(25)},
        lastname: {type: Datatypes.STRING(25)},
        date_of_birth: {type: Datatypes.DATE }
    });
    Customer.associate = (models) => {
        models.Customer.hasMany(models.Soldout, {foreignKey: { name: "cust_passportId", allowNull: false}});
        models.Customer.hasMany(models.Rented, {foreignKey: { name: "cust_passportId", allowNull: false}});
    };
    return Customer;
};