module.exports = {
    // development: {
    //     dialect: "sqlite",
    //     storage: "./db.development.sqlite",
    //     operatorsAliases: false
    //     //todo make security
    // },
    // test: {
    //     dialect: "sqlite",
    //     storage: ":memory:"
    // },
    
    development: {
        host: 'us-cdbr-iron-east-05.cleardb.net',
        user: 'b1e8a33110188a',
        password: 'cf941299',
        database: 'heroku_5dd0bb320a4d88c',
        dialect: 'mysql',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        operatorsAliases: false
    }
};