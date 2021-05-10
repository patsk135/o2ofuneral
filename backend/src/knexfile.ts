// Update with your config settings.
module.exports = {
    development: {
        client: process.env.DB,
        connection: process.env.DB_URI
    },
    production: {
        client: process.env.DB,
        connection: process.env.DB_URI
    }
};
