import app from './src/presentation/app.js';
import mongoose from 'mongoose';
import 'dotenv/config';
import { startKafkaConsumer } from './src/infrastructure/messaging/kafkaConsumer.js';

const PORT = process.env.PORT || 3000;
let server;


const startServer = async () => {
    try {

        await mongoose.connect(process.env.DATABASE_URL, {
            family: 4,
        });
        console.log('Connected to MongoDB');


        server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });


        console.log('Connecting to Kafka...');
        await startKafkaConsumer();

    } catch (err) {
        console.error('❌ [Server Boot Error]: ', err.message);
        process.exit(1);
    }
};


startServer();


process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);

    if (server) {
        server.close(() => {
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
});