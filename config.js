	
exports.server = {
	port: process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip: process.env.OPENSHIFT_NODEJS_IP || undefined
}

exports.mongodb = {
    hostname: process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost',
    port: process.env.OPENSHIFT_MONGODB_DB_PORT || 27017,
    db: 'gewinnspiel2014',
    username: process.env.OPENSHIFT_MONGODB_DB_USERNAME || undefined,
    password: process.env.OPENSHIFT_MONGODB_DB_PASSWORD || undefined
}
