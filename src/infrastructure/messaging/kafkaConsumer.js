import { Kafka } from 'kafkajs';

const kafkaInstance = new Kafka({
    clientId: 'product-catalog-consumer',
    brokers: [process.env.KAFKA_BROKERS || 'localhost:9092']
});

const consumer = kafkaInstance.consumer({ groupId: 'product-logger-group' });


export const startKafkaConsumer = async () => {
    try {
        await consumer.connect();

        await consumer.subscribe({ topic: 'product-created', fromBeginning: true });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const messageValue = message.value ? message.value.toString() : '';
                console.log(`${topic}[${partition}]: ${messageValue}`);
            }
        });
    } catch (error) {
        console.error(' [Kafka Consumer] Failed to start consumer: ', error);
    }
}