import kafka from "./kafkaClient.js";

const producer = kafka.producer();
let isConnected = false;
export const publishProductCreatedEvent = async (product) => {
    try {
        if (!isConnected) {
            await producer.connect();
            isConnected = true;
            console.log('[Kafka Producer] Connected and ready to stream events.');
            
        }
        await producer.connect();
        await producer.send({
            topic: 'product-created',
            messages: [{ value: JSON.stringify(product) }]
        });

        console.log(` [Kafka Producer] Event sent successfully: ITEM_CREATED for ID: ${product.id}`);
    } catch (error) {
        console.error(' [Kafka Producer] Failed to send event: ', error);
    } 
}
