module.exports = (items) => {
    return items.map(search_rent => {
        return Object.assign(
            {},
            {
                _id: search_rent.rented_id,
                price_for_month: search_rent.price_for_month,
                full_time: search_rent.full_time,
                term_of_rented: search_rent.term_of_rented === "NaN-0NaN-0NaN" ? 'empty': search_rent.term_of_rented,
                'city': search_rent['Flat.city'],
                'street': search_rent['Flat.street'],
                'building': search_rent['Flat.building'],
                'room_amount': search_rent['Flat.room_amount'],
                'stage': search_rent['Flat.stage'],
                'total_floors': search_rent['Flat.total_floors'],
                'size': search_rent['Flat.size'],
                'profile id':`${search_rent['Profile.name']} ${search_rent['Profile.surname']}`
            }
        )
    });
};