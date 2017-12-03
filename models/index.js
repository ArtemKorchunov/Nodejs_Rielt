'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.js')[env];
var db        = {};

if (config.use_env_variable) {
    var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
    .readdirSync(__dirname)
    .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
.forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
let sync_argumetn_of = false;
sequelize.sync({
    force:sync_argumetn_of,
    logging: console.log
}).then(function generate() {
    var d = arguments;
    if (sync_argumetn_of) {
        db.Customer.bulkCreate([
            {
                passportid: 'MT564587',
                name: 'Nikita',
                surname: 'Chernenko',
                last_name: 'Vadimovich',
                birthday: '1945-01-01'
            },
            {
                passportid: 'MT564200',
                name: 'Nikita',
                surname: 'Chernenko',
                last_name: 'Vadimovich',
                birthday: '1945-01-01'
            },
            {
                passportid: 'MT564201',
                name: 'Nikita',
                surname: 'Chernenko',
                last_name: 'Vadimovich',
                birthday: '1945-01-01'
            },
            {
                passportid: 'MT564202',
                name: 'Nikita',
                surname: 'Chernenko',
                last_name: 'Vadimovich',
                birthday: '1945-01-01'
            },
            {
                passportid: 'MT564589',
                name: 'Vadim',
                surname: 'Chernenko',
                last_name: 'Afanasiev',
                birthday: '1945-01-01'
            },
            {
                passportid: 'MT564588',
                name: 'Nikita',
                surname: 'Afanasiev',
                last_name: 'Maksimov',
                birthday: '1945-01-01'
            }
        ]);
        db.Owner.bulkCreate([
            {
                owner_id: 25,
                passportid: 'MT565477',
                name: 'Ilia',
                surname: 'Sakovich',
                last_name: 'Vadimovich',
                birthday: '1999-01-01'
            },
            {
                passportid: 'MT564589',
                name: 'Vadim',
                surname: 'Chernenko',
                last_name: 'Afanasiev',
                birthday: '1945-01-01'
            },
            {
                passportid: 'MT564588',
                name: 'Nikita',
                surname: 'Afanasiev',
                last_name: 'Maksimov',
                birthday: '1945-01-01'
            }
        ]);
        db.Flat.bulkCreate([
            {
                flat_id: '1',
                city: 'Xarkov',
                street: 'Pushkin',
                flat: '225B',
                room_amount: '4',
                stage: '5',
                total_floors: '9',
                size: '40',
                owner_id: '25',
                service: '1'
            }
        ]);
        let exampleA = db.User.build();
        exampleA.createUser(exampleA, 'admin', '04061974', 5, function () {
        });
        let exampleU = db.User.build();
        exampleU.createUser(exampleU, 'user', '04061974', 1, function (err) {
            db.Profile.create({name: 'Artem', surname: 'Korchunov', user_username: 'user'});
            db.Soldout.bulkCreate([
                {
                    price_of_realty: 20000,
                    term_of_lease: '2018-01-01',
                    deposit_money: 2000,
                    cust_id: 1,
                    flat_id: 1,
                    profile_id: 1
                }
            ])
        });
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;