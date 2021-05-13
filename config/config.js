/* this is for server-side configuration-related 
variables that will be used in our application */

const secret = '3#=vla6j$52gwrq1r$$bk1e0*s$*24poi_=8n54+dt5119+i8z'


const config = {
    env: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || secret, //secret code to be used to sign JWT
    MONGODB_URI: process.env.MONGODB_URI ||
     process.env.MONGO_HOST || 
     'mongodb://' + (process.env.IP || 'localhost') + ':' +
     (process.env.MONGO_PORT || '27017') +
     '/likeshop',
     stripe_connect_client_id: 'YOUR_stripe_connect_client',
     stripe_pub_secret_key: 'pk_live_51IpPJZFfQp6SpxzSe9heZp6dpVSWj6oXtO9BVvVpvn7nlYkle7LTngTpyUR0RbpLssDlH17BJ5qHpN3JBckiXkm2001M7PIgt9',
     stripe_api_key: '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'
}

export default config