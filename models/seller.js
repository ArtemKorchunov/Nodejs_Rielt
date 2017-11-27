module.exports = (sequelize, Datatypes) => {
    var Seller = sequelize.define("Seller", {
        passportid: {
            type: Datatypes.STRING(8),
            primaryKey: true,
            allowNull: false
        },
        name: {type: Datatypes.STRING(25)},
        surname: {type: Datatypes.STRING(25)},
        last_name: {type: Datatypes.STRING(25)},
        birthday: {type: Datatypes.DATE}
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
        models.Seller.hasMany(models.Flat, {foreignKey: {name: "seller_passportid"}})
    };
    return Seller;
};