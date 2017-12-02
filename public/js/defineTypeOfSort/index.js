let Customer_sort = require('./Customer');
let Flat_sort = require('./Flat');
let Rented_sort = require('./Rented');
let Seller_sort = require('./Seller');
let Soldout_sort = require('./Soldout');

module.exports = ((models,module,options) => {
        switch (module) {
            case 'Flat':
                return Flat_sort(models,options);
                break;
            case 'Rented':
                return Rented_sort(models,options);
                break;
            case 'Seller':
                return Seller_sort(models, options);
                break;
            case 'Soldout':
                return Soldout_sort(models, options);
                break;
            case 'Customer':
                return Customer_sort(models, options);
                break;
        }
    }
);