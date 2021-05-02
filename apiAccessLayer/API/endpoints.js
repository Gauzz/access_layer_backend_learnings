const RESTMethod = {
    GET: "GET",
    POST: "POST"
};

const CORE = {

    user: {
        get: '/user/get',
        create: '/user/create',
        list: '/user/list',
        update: '/user/update',
        updateOne: '/user/updateOne',
        count: '/user/count'
    },
    userLogin: {
        get: '/userLogin/get',
        create: '/userLogin/create',
        list: '/userLogin/list',
        update: '/userLogin/update',
        updateOne: '/userLogin/updateOne',
        count: '/userLogin/count',
        deleteOne: '/userLogin/deleteOne',
        compareToken: '/userLogin/compareToken'
    }
}
module.exports = {
    RESTMethod, CORE
}

