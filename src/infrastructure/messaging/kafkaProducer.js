import { Kafka } from 'kafkajs';
import { catchAsync } from '../../presentation/utils/catchAsync';

const kafka = new Kafka({
    clientId: 'product-catalog-service',
    brokers: [process.env.KAFKA_BROKERS || 'localhost:9092']
});
const producer = kafka.producer();

export const publishProductCreatedEvent = async (product) => {
    try {
        await producer.connect();
        await producer.send({
            topic: 'product-created',
            messages: [{ value: JSON.stringify(product) }]
        });

        console.log(` [Kafka Producer] Event sent successfully: ITEM_CREATED for ID: ${product.id}`);
    } catch (error) {
        console.error(' [Kafka Producer] Failed to send event: ', error);
    } finally {
        await producer.disconnect();
    }
}
