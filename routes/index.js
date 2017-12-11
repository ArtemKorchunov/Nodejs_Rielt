let checkAuthA =  require('../middleware/checkAuth/checkAuthA');
let checkAuthU = require('../middleware/checkAuth/checkAuthU');
let ValidateEditForms = require('../middleware/Validate/ValidateEditForms');
let ValidateObj = require('../middleware/Validate/ValidateObj');
let ValidateSearchForms = require('../middleware/Validate/ValidateSearchForms');
let loadUsers = require('../middleware/loadFiles/loadUsers');
let loadFlats = require('../middleware/loadFiles/loadFlats');
let loadOwners = require('../middleware/loadFiles/loadOwners');
let loadCustomers = require('../middleware/loadFiles/loadCustomers');
let loadProfiles = require('../middleware/loadFiles/loadProfiles');
let loadProfile = require('../middleware/loadFiles/loadProfile');
let ReplaceMethod = require('../middleware/Validate/Replace-method');

let joinFlats = require('../middleware/joinFiles/joinFlats');
let joinRenteds = require('../middleware/joinFiles/joinRenteds');
let joinSoldouts = require('../middleware/joinFiles/joinSoldouts');

module.exports = (app) => {
    app.get('/admin*',checkAuthA);
    app.get('/user*',checkAuthU);
    app.post('/user/control-panel/*',ValidateObj,ReplaceMethod);

    app.get('/', require('./main').get);
    app.get('/login', require('./login').get);
    app.post('/login', require('./login').post);
    app.post('/get-table/:table_name/:id', require('./get-column').post);

    app.get('/admin', require('./admin/admin').get);
    app.post('/admin', require('./admin/admin').post);
    app.get('/admin/control-panel(/add-user)?',loadUsers, require('./admin/control-panel/index').get);
    app.get('/admin/control-panel/sql', require('./admin/control-panel/sql').get);
    app.post('/admin/control-panel/sql', require('./admin/control-panel/sql').post);

    app.get('/user', require('./user/user').get);

    app.get('/user/settings(/change-profile)?', require('./user/settings/change-profile').get);
    app.post('/user/settings/change-profile',ValidateEditForms, require('./user/settings/change-profile').post);
    app.get('/user/settings/profile',loadProfile, require('./user/settings/profile').get);

    app.get('/user/control-panel(/add-flat)?',joinFlats,loadOwners, require('./user/control-panel/add-flat').get);
    app.post('/user/control-panel/add-flat', require('./user/control-panel/add-flat').post);

    app.get('/user/control-panel/add-owner',loadOwners, require('./user/control-panel/add-owner').get);
    app.post('/user/control-panel/add-owner', require('./user/control-panel/add-owner').post);

    app.get('/user/control-panel/add-customer',loadCustomers, require('./user/control-panel/add-customer').get);
    app.post('/user/control-panel/add-customer', require('./user/control-panel/add-customer').post);

    app.get('/user/control-panel/add-rented',joinRenteds, loadCustomers,loadFlats,loadProfiles, require('./user/control-panel/add-rented').get);
    app.post('/user/control-panel/add-rented', require('./user/control-panel/add-rented').post);

    app.get('/user/control-panel/add-soldout',joinSoldouts, loadCustomers,loadFlats,loadProfiles, require('./user/control-panel/add-soldout').get);
    app.post('/user/control-panel/add-soldout', require('./user/control-panel/add-soldout').post);

    app.get('/user/control-panel/search-rented',loadProfiles,loadCustomers, require('./user/control-panel/search-rented').get);
    app.post('/user/search-rented',ValidateSearchForms, require('./user/control-panel/search-rented').post);
    app.get('/user/control-panel/search-soldout',loadProfiles,loadCustomers, require('./user/control-panel/search-soldout').get);
    app.post('/user/search-soldout',ValidateSearchForms, require('./user/control-panel/search-soldout').post);

    app.get('/user/control-panel/report-generator', require('./user/control-panel/report-generator').get);
    app.post('/print/summary-deal',loadProfile, require('./user/control-panel/printSummary-deal').post);
    app.post('/print/amount-loc',loadProfile, require('./user/control-panel/printAmount-loc').post);

    app.get('/logout', require('./logout').get);

    app.post('/delete/column/:table_name', require('./user/actions/delete-column').post);
    app.post('/edit/column/:table_name/:id',ValidateEditForms,ReplaceMethod, require('./user/actions/edit-column').post);
    app.post('/search/:table_name',ValidateEditForms,ReplaceMethod, require('./user/actions/search-column').post);
    app.post('/sort/:table_name/:column_name/:sort_type', require('./user/actions/sort-column').post)
};

