module.exports = (items) => {
    return items.map(rented => {
        return Object.assign(
            {},
            {
                _id: rented.rented_id,
                price_for_month: rented.price_for_month,
                term_of_rented: rented.term_of_rented,
                full_time: rented.full_time,
                'cust id' : `${rented['Customer.surname']} ${rented['Customer.name']} ${rented['Customer.last_name']}`,
                'flat id' : `${rented['Flat.city']} ${rented['Flat.street']} ${rented['Flat.flat']}`,
                'profile id':`${rented['Profile.name']} ${rented['Profile.surname']}`
            }
        )
    });
};