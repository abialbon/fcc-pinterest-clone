const mongoose = require('mongoose');

module.exports = {
    connect: (dbUrl) => {
        mongoose.Promise = global.Promise;
        mongoose.connect(dbUrl, { useMongoClient: true });
        mongoose.connection
            .once('open', () => {
                console.log('The connection to the database has been established!');
            })
            .on('error', (err) => {
                console.log(err.message);
                process.exit(1);
            });

        // 😅 Require all models
        require('./user');
        require('./pin');
    }
};