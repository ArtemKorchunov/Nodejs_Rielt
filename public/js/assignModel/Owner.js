module.exports = (items) => {
    return items.map(owner => {
        return Object.assign(
            {},
            {
                _id: owner.owner_id,
                passportid: owner.passportid,
                name: owner.name,
                surname: owner.surname,
                last_name: owner.last_name,
                birthday: owner.birthday,
            }
        )
    });
};