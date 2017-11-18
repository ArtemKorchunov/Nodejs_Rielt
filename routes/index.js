var checkAuth =  require('../middleware/checkAuth');

module.exports = function(app) {
    app.get('/', require('./main').get);
    app.get('/login', require('./login').get);

    app.post('/login', require('./login').post);
    app.get('/admin',checkAuth , require('./admin').get);
    app.get('/logout', checkAuth, require('./logout').get);


};

