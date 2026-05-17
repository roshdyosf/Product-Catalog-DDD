import app from './src/presentation/app.js';
import mongoose from 'mongoose';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;


let server;
// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {
    family: 4, // Use IPv4, comment this if you need IPv6
}).then(() => {
    console.log('Connected to MongoDB');

    server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

}).catch(err => {
    console.log('DB Connection Error: ', err.message);
});




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