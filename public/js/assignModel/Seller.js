module.exports = (items) => {
    return items.map(seller => {
        return Object.assign(
            {},
            {
                _id: seller.seller_id,
                passportid: seller.passportid,
                name: seller.name,
                surname: seller.surname,
                last_name: seller.last_name,
                birthday: seller.birthday,
            }
        )
    });
};