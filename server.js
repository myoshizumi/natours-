// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
    console.log('uncaught exception!!!!!!!!!! 🤬 shutting down......');
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({ path: './config.env' });
const { Server } = require('mongodb');
const app = require('./app');

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD,
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log('DB connection successful');
    });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}...`);
});
process.on('unhandledRejection', (err) => {
    console.log('unhandled rejection!!!!!!!!!! 🤬 shutting down......');
    console.log(err.name, err.message);
    Server.close(() => {
        process.exit(1);
    });
});
