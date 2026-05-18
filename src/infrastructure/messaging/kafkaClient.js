import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'product-catalog-service',
    brokers: [process.env.KAFKA_BROKERS || 'localhost:9092'],
    ssl: process.env.KAFKA_USERNAME ? { rejectUnauthorized: false } : false,
    sasl: process.env.KAFKA_USERNAME ? {
        mechanism: 'plain',
        username: process.env.KAFKA_USERNAME,
        password: process.env.KAFKA_PASSWORD
    } : undefined
});

export default kafka;
