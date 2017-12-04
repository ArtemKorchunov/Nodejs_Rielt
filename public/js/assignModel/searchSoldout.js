module.exports = (items) => {
    return items.map(search_soldout => {
        return Object.assign(
            {},
            {
                _id: search_soldout.rented_id,
                price_of_realty: search_soldout.price_of_realty,
                term_of_contract: search_soldout.term_of_contract,
                deposit_money: search_soldout.deposit_money,
                'city': search_soldout['Flat.city'],
                'street': search_soldout['Flat.street'],
                'room_amount': search_soldout['Flat.room_amount'],
                'stage': search_soldout['Flat.stage'],
                'total_floors': search_soldout['Flat.total_floors'],
                'size': search_soldout['Flat.size'],
                'profile id':`${search_soldout['Profile.name']} ${search_soldout['Profile.surname']}`
            }
        )
    });
};