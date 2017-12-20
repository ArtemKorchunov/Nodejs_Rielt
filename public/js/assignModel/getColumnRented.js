module.exports = (items) => {
    return items.map(search_rent => {
        return Object.assign(
            {},
            {
                _id: search_rent.rented_id,
                price: search_rent.price_for_month,
                full_time: search_rent.full_time,
                term_of_rented: search_rent.term_of_rented === "NaN-0NaN-0NaN" ? 'empty': search_rent.term_of_rented,
                'address': `City: ${search_rent['Flat.city']}, Street: ${search_rent['Flat.street']}, Building: ${search_rent['Flat.building']}, Flat: ${search_rent['Flat.flat']}`,
                'room_amount': search_rent['Flat.room_amount'],
                'stage': search_rent['Flat.stage'],
                'total_floors': search_rent['Flat.total_floors'],
                'size': search_rent['Flat.size'],
                'profile_name':`${search_rent['Profile.name']} ${search_rent['Profile.surname']}`,
                'customer_name': `${search_rent['Customer.surname']} ${search_rent['Customer.name']} ${search_rent['Customer.last_name']}`,
                'owner_name': `${search_rent['Flat.Owner.surname']} ${search_rent['Flat.Owner.name']} ${search_rent['Flat.Owner.last_name']}`
            }
        )
    });
};