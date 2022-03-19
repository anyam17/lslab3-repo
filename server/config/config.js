const config = {
    production: {
        SECRET: process.env.SESSION_SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default: {
        SECRET: 'SUPERSECRETPASSWORD123',
        DATABASE: 'mongodb://mongo-srv:27017/iu'
    }
}

exports.get = function get(env) {
    return config[env] || config.default
}
