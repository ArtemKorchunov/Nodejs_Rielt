module.exports = (sequelize, Datatypes) => {
    var Flat = sequelize.define("Flat", {
        flat_id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        city: {type: Datatypes.STRING},
        street: {type: Datatypes.STRING},
        flat: {type: Datatypes.STRING},
        room_amount: {type: Datatypes.INTEGER},
        stage: {type: Datatypes.INTEGER},
        total_floors: {type: Datatypes.INTEGER(2)},
        size: {type: Datatypes.INTEGER(4)}
    });
    Flat.associate = (models) => {
        models.Flat.belongsTo(models.Seller, {foreignKey: {name: "seller_passportid", allowNull: false}});
        models.Flat.hasMany(models.Soldout, {foreignKey: {name: "flat_id", allowNull: false}});
        models.Flat.hasMany(models.Rented, {foreignKey: {name: "flat_id", allowNull: false}});
    };
    return Flat;
};