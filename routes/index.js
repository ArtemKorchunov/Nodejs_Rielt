let checkAuthA =  require('../middleware/checkAuth/checkAuthA');
let checkAuthU = require('../middleware/checkAuth/checkAuthU');
let ValidateEditForms = require('../middleware/Validate/ValidateEditForms');
let ValidateObj = require('../middleware/Validate/ValidateObj');
let loadUsers = require('../middleware/loadFiles/loadUsers');
let loadFlats = require('../middleware/loadFiles/loadFlats');
let loadSellers = require('../middleware/loadFiles/loadSellers');
let loadCustomers = require('../middleware/loadFiles/loadCustomers');
let loadSoldouts = require('../middleware/loadFiles/loadSoldouts');
let loadProfiles = require('../middleware/loadFiles/loadProfiles');
let loadProfile = require('../middleware/loadFiles/loadProfile');
let loadRenteds = require('../middleware/loadFiles/loadRenteds');
let ReplaceMethod = require('../middleware/Validate/Replace-method');
module.exports = (app) => {
    app.get('/admin*',checkAuthA);
    app.get('/user*',checkAuthU);
    app.post('/user/control-panel/*',ValidateObj,ReplaceMethod);

    app.get('/', require('./main').get);
    app.get('/login', require('./login').get);
    app.post('/login', require('./login').post);

    app.get('/admin', require('./admin/admin').get);
    app.post('/admin', require('./admin/admin').post);
    app.get('/admin/control-panel(/add-user)?',loadUsers, require('./admin/control-panel/index').get);

    app.get('/user', require('./user/user').get);

    app.get('/user/settings(/change-profile)?', require('./user/settings/change-profile').get);
    app.post('/user/settings/change-profile',ValidateEditForms, require('./user/settings/change-profile').post);
    app.get('/user/settings/profile',loadProfile, require('./user/settings/profile').get);

    app.get('/user/control-panel(/add-flat)?',loadFlats,loadSellers, require('./user/control-panel/add-flat').get);
    app.post('/user/control-panel/add-flat', require('./user/control-panel/add-flat').post);

    app.get('/user/control-panel/add-seller',loadSellers, require('./user/control-panel/add-seller').get);
    app.post('/user/control-panel/add-seller', require('./user/control-panel/add-seller').post);

    app.get('/user/control-panel/add-customer',loadCustomers, require('./user/control-panel/add-customer').get);
    app.post('/user/control-panel/add-customer', require('./user/control-panel/add-customer').post);

    app.get('/user/control-panel/add-rented',loadRenteds, loadCustomers,loadFlats,loadProfiles, require('./user/control-panel/add-rented').get);
    app.post('/user/control-panel/add-rented', require('./user/control-panel/add-rented').post);

    app.get('/user/control-panel/add-soldout',loadSoldouts, loadCustomers,loadFlats,loadProfiles, require('./user/control-panel/add-soldout').get);
    app.post('/user/control-panel/add-soldout', require('./user/control-panel/add-soldout').post);

    app.get('/logout', require('./logout').get);


    app.post('/delete/column/:table_name', require('./user/actions/delete-column').post);
    app.post('/edit/column/:table_name/:id_name/:id',ValidateEditForms,ReplaceMethod, require('./user/actions/edit-column').post);
};

