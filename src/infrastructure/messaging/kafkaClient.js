import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'product-catalog-service',
    brokers: [process.env.KAFKA_BROKERS || 'localhost:9092'],
    ssl: process.env.KAFKA_USERNAME ? true : false,
    sasl: process.env.KAFKA_USERNAME ? {
        mechanism: 'scram-sha-256',
        username: process.env.KAFKA_USERNAME,
        password: process.env.KAFKA_PASSWORD
    } : undefined
});

export default kafka;