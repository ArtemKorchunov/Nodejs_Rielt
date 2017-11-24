var checkAuthA =  require('../middleware/checkAuthA');
var checkAuthU = require('../middleware/checkAuthU');
var ValidateFields = require('../middleware/ValidateFileds');
module.exports = function(app) {
    app.get('/admin*',checkAuthA);
    app.get('/user*',checkAuthU);

    app.get('/', require('./main').get);
    app.get('/login', require('./login').get);
    app.post('/login', require('./login').post);

    app.get('/admin', require('./admin/admin').get);
    app.post('/admin', require('./admin/admin').post);
    app.get('/admin/control-panel(/add-user)?', require('./admin/control-panel/index').get);

    app.get('/user', require('./user/user').get);
    app.get('/user/control-panel(/add-flat)?', require('./user/control-panel/index').get);
    app.get('/user/settings(/change-profile)?', require('./user/settings/change-profile').get);
    app.post('/user/change-profile',ValidateFields, require('./user/settings/change-profile').post);
    app.get('/user/settings/profile', require('./user/settings/profile').get)

    app.get('/logout', require('./logout').get);


};

