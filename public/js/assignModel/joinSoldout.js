module.exports = (items) => {
    return items.map(soldout => {
        return Object.assign(
            {},
            {
                _id: soldout.soldout_id,
                price_of_realty: soldout.price_of_realty,
                term_of_lease: soldout.term_of_lease,
                deposit_money: soldout.deposit_money,
                'cust id' : `${soldout['Customer.surname']} ${soldout['Customer.name']} ${soldout['Customer.last_name']}`,
                'flat id' : `${soldout['Flat.city']} ${soldout['Flat.street']} ${soldout['Flat.flat']}`,
                'profile id':`${soldout['Profile.name']} ${soldout['Profile.surname']}`
            }
        )
    });
};