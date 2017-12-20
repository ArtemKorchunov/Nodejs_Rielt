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
                name: 'Ilia',
                surname: 'Semen',
                last_name: 'Vladimirovich',
                birthday: '1945-01-01'
            },
            {
                passportid: 'MT564201',
                name: 'Mike',
                surname: 'Brandon',
                last_name: 'Zaker',
                birthday: '1945-01-01'
            },
            {
                passportid: 'MT564202',
                name: 'John',
                surname: 'Vul',
                last_name: 'Davis',
                birthday: '1945-01-01'
            },
            {
                passportid: 'MT564589',
                name: 'Simon',
                surname: 'Black',
                last_name: 'Mithcel',
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
                passportid: 'MT565478',
                name: 'Artem',
                surname: 'Petrov',
                last_name: 'Afanasievich',
                birthday: '1985-01-01'
            },
            {
                owner_id: 26,
                passportid: 'MT565477',
                name: 'Ilia',
                surname: 'Sakovich',
                last_name: 'Vadimovich',
                birthday: '1999-01-01'
            },
            {
                owner_id: 111,
                passportid: 'MT564520',
                name: 'Sofia',
                surname: 'Grace',
                last_name: 'Dumlton',
                birthday: '1945-01-01'
            },
            {
                owner_id: 46,
                passportid: 'MT565421',
                name: 'Artem',
                surname: 'Ivanov',
                last_name: 'Ivanovich',
                birthday: '1975-01-01'
            },
            {
                owner_id: 45,
                passportid: 'MT565422',
                name: 'Nikita',
                surname: 'Petrov',
                last_name: 'Ivanovich',
                birthday: '1965-01-01'
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
                building: '225B',
                flat: '22',
                room_amount: '4',
                stage: '5',
                total_floors: '9',
                size: '40',
                owner_id: '25',
                service: '1'
            },
            {
                flat_id: '2',
                city: 'Xarkov',
                street: 'Heroiv Pratsi',
                building:'355D',
                flat: '25',
                room_amount: '1',
                stage: '1',
                total_floors: '16',
                size: '20',
                owner_id: '25',
                service: '1'
            },
            {
                flat_id: '3',
                city: 'Xarkov',
                street: 'Heroiv Pratsi',
                building:'240A',
                flat: '24',
                room_amount: '4',
                stage: '5',
                total_floors: '16',
                size: '35',
                owner_id: '25',
                service: '1'
            },
            {
                flat_id: '4',
                city: 'Xarkov',
                street: 'Heroiv Pratsi',
                building:'40A',
                flat: '2',
                room_amount: '4',
                stage: '5',
                total_floors: '16',
                size: '35',
                owner_id: '25',
                service: '1'
            },
            {
                flat_id: '5',
                city: 'Xarkov',
                street: 'Kievska',
                building:'151D',
                flat: '15',
                room_amount: '1',
                stage: '1',
                total_floors: '16',
                size: '20',
                owner_id: '25',
                service: '0'
            },
            {
                flat_id: '6',
                city: 'Xarkov',
                street: 'Proletarska',
                building:'154d',
                flat: '15',
                room_amount: '1',
                stage: '1',
                total_floors: '16',
                size: '20',
                owner_id: '25',
                service: '0'
            },
            {
                flat_id: '7',
                city: 'Kiev',
                street: 'Tsvetochnaya',
                building:'101C',
                flat: '11',
                room_amount: '5',
                stage: '6',
                total_floors: '12',
                size: '25',
                owner_id: '111',
                service: '0'
            },
            {
                flat_id: '8',
                city: 'Kiev',
                street: 'Volgogradska',
                building:'101E',
                flat: '12',
                room_amount: '3',
                stage: '9',
                total_floors: '12',
                size: '25',
                owner_id: '25',
                service: '0'
            },
            {
                flat_id: '9',
                city: 'Kiev',
                street: 'Novo-Orlovska',
                building:'12t',
                flat: '19',
                room_amount: '3',
                stage: '7',
                total_floors: '10',
                size: '40',
                owner_id: '45',
                service: '0'
            }
        ]);
        let exampleA = db.User.build();
        exampleA.createUser(exampleA, 'admin', '04061974', 5, function () {
        });
        let exampleU = db.User.build();
        exampleU.createUser(exampleU, 'user1', '04061974', 1, function (err) {
            db.Profile.create({name: 'Nikita', surname: 'Chernenko', user_username: 'user1',work_location: 'XTZ', pc_from_deal: 2.5});
        });
        exampleU.createUser(exampleU, 'user2', '04061974', 1, function (err) {
            db.Profile.create({name: 'Ilia', surname: 'Sakovich', user_username: 'user2',work_location: 'XTZ', pc_from_deal: 3.5});
        });
        exampleU.createUser(exampleU, 'user3', '04061974', 1, function (err) {
            db.Profile.create({name: 'Mike', surname: 'Vazovski', user_username: 'user3',work_location: 'Puskinska', pc_from_deal: 3.8});
        });
        exampleU.createUser(exampleU, 'user4', '04061974', 1, function (err) {
            db.Profile.create({name: 'John', surname: 'Volter', user_username: 'user4',work_location: 'Kyivska', pc_from_deal: 4});
        });
        exampleU.createUser(exampleU, 'user', '04061974', 1, function (err) {
            db.Profile.create({name: 'Artem', surname: 'Korchunov', user_username: 'user',work_location: 'Puskinska', pc_from_deal: 4});
            function getRnd(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            }
            for (let i = 0; i < 40; i++) {
                let customer = getRnd(0, 7);
                customer = customer % 2 === 0 ? null : customer;
                let term_of_rented = `${getRnd(2019,2027)}-0${getRnd(0,9)}-0${getRnd(0,9)}`;
                let full_time = '0';
                if (term_of_rented.split('-')[0] % 2 === 0){
                    term_of_rented = null;
                    full_time = '1';
                }
                db.Soldout.create({
                        price_of_realty: getRnd(10000, 100001),
                        term_of_contract: `${getRnd(2019, 2021)}-0${getRnd(0,9)}-0${getRnd(0,9)}`,
                        deposit_money: getRnd(1000, 3001),
                        customer_id:  customer ,
                        flat_id: getRnd(1, 5),
                        profile_id: getRnd(1, 5)
                    }
                );
                db.Rented.create({
                        price_for_month: getRnd(500, 6000),
                        term_of_rented: term_of_rented,
                        full_time: full_time,
                        customer_id:  customer ,
                        flat_id: getRnd(5, 10),
                        profile_id: getRnd(1, 5)
                    }
                )
            }
        });
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;