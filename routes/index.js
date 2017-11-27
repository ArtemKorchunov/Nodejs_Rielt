var checkAuthA =  require('../middleware/checkAuthA');
var checkAuthU = require('../middleware/checkAuthU');
var ValidateProfile = require('../middleware/ValidateProfile');
var ValidateObj = require('../middleware/ValidateObj');
var loadUsers = require('../middleware/loadUsers');
var loadFlat = require('../middleware/loadFlat');
var loadSeller = require('../middleware/loadSeller');
var loadCustomer = require('../middleware/loadCustomer');
var loadSoldouts = require('../middleware/loadSoldouts');
var loadProfile = require('../middleware/loadProfile');

module.exports = (app) => {
    app.get('/admin*',checkAuthA);
    app.get('/user*',checkAuthU);

    app.get('/', require('./main').get);
    app.get('/login', require('./login').get);
    app.post('/login', require('./login').post);

    app.get('/admin', require('./admin/admin').get);
    app.post('/admin', require('./admin/admin').post);
    app.get('/admin/control-panel(/add-user)?',loadUsers, require('./admin/control-panel/index').get);

    app.get('/user', require('./user/user').get);

    app.get('/user/settings(/change-profile)?', require('./user/settings/change-profile').get);
    app.post('/user/change-profile',ValidateProfile, require('./user/settings/change-profile').post);
    app.get('/user/settings/profile', require('./user/settings/profile').get);

    app.get('/user/control-panel(/add-flat)?',loadFlat,loadSeller, require('./user/control-panel/add-flat').get);
    app.post('/user/control-panel/add-flat',ValidateObj, require('./user/control-panel/add-flat').post);

    app.get('/user/control-panel/add-seller',loadSeller, require('./user/control-panel/add-seller').get);
    app.post('/user/control-panel/add-seller',ValidateObj, require('./user/control-panel/add-seller').post);

    app.get('/user/control-panel/add-customer',loadCustomer, require('./user/control-panel/add-customer').get);
    app.post('/user/control-panel/add-customer',ValidateObj, require('./user/control-panel/add-customer').post);

    app.get('/user/control-panel/add-rented', require('./user/control-panel/add-rented').get);


    app.get('/user/control-panel/add-soldout',loadSoldouts, loadCustomer,loadFlat,loadProfile, require('./user/control-panel/add-soldout').get);
    app.post('/user/control-panel/add-soldout', require('./user/control-panel/add-soldout').post);

    app.get('/logout', require('./logout').get);


};

