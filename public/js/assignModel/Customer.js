module.exports = (items) => {
    return items.map(customer => {
        return Object.assign(
            {},
            {
                _id: customer.customer_id,
                passportid: customer.passportid,
                name: customer.name,
                surname: customer.surname,
                last_name: customer.last_name,
                birthday: customer.birthday,
            }
        )
    });
};