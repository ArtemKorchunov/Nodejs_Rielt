module.exports = (items) => {
    return items.map(search_soldout => {
        return Object.assign(
            {},
            {
                _id: search_soldout.soldout_id,
                price: search_soldout.price_of_realty,
                term_of_contract: search_soldout.term_of_contract,
                deposit: search_soldout.deposit_money,
                'address': `City: ${search_soldout['Flat.city']}, Street: ${search_soldout['Flat.street']}, Building: ${search_soldout['Flat.building']}, Flat: ${search_soldout['Flat.flat']}`,
                'room_amount': search_soldout['Flat.room_amount'],
                'stage': search_soldout['Flat.stage'],
                'total_floors': search_soldout['Flat.total_floors'],
                'size': search_soldout['Flat.size'],
                'profile_name':`${search_soldout['Profile.name']} ${search_soldout['Profile.surname']}`,
                'customer_name': `${search_soldout['Customer.surname']} ${search_soldout['Customer.name']} ${search_soldout['Customer.last_name']}`,
                'owner_name': `${search_soldout['Flat.Owner.surname']} ${search_soldout['Flat.Owner.name']} ${search_soldout['Flat.Owner.last_name']}`

            }
        )
    });
};