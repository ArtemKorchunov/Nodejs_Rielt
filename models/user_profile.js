module.exports = function User_profile(db, models) {
    var User_profile = models.User.extendsTo("profile", {
        name: {type:'text', size: 10},
        surname: {type:'text', size: 10},
        date_of_birth: {type:'date'},
        male : {type: "enum", values: ["M","F"]},
        work_location: {type:'text', size: 20},
        pc_from_deal: {type:'integer', size: 2}
    }, { reverse: "prof" });
    return User_profile;
};