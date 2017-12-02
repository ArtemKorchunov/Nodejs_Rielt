module.exports = (items) => {
    return items.map(flat => {
        return Object.assign(
            {},
            {
                _id: flat.flat_id,
                city: flat.city,
                street: flat.street,
                flat: flat.flat,
                room_amount: flat.room_amount,
                stage: flat.stage,
                total_floors: flat.total_floors,
                size: flat.size,
                service: (flat.service == '1' ? 'Sale' : 'Rent'),
                seller : `${flat['Seller.surname']} ${flat['Seller.name']} ${flat['Seller.last_name']}`
            }
        )
    });
};