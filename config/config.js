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
        username: 'root',
        password: '',
        database: 'rielt',
        host: '127.0.0.1',
        dialect: 'mysql',
        operatorsAliases: false
    }
};