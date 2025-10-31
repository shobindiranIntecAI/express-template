import amqp, { Connection, Channel } from 'amqplib';
import { ExampleConsumer } from './consumers';
import { env } from '@/config/env';

let connection: Connection | any = null;
let channel: Channel | any = null;

export const rabbitmq = {
  async connect(
    retryCount = 5,
    retryDelay = 3000
  ): Promise<{ connection: Connection; channel: Channel }> {
    if (connection && channel) return { connection, channel };

    for (let attempt = 1; attempt <= retryCount; attempt++) {
      try {
        console.log(
          `🐇 Connecting to RabbitMQ (attempt ${attempt}/${retryCount})...`
        );
        connection = await amqp.connect(env.QUEUE_RABBITMQ_URL);
        channel = await connection.createChannel();

        await channel.assertExchange(
          env.QUEUE_RABBITMQ_EXCHANGE_NAME,
          env.QUEUE_RABBITMQ_EXCHANGE_TYPE,
          { durable: true }
        );

        ExampleConsumer.ExampleProcess(channel);
        console.log('✅ RabbitMQ connected successfully');
        return { connection, channel };
      } catch (err) {
        console.error(
          `❌ RabbitMQ connection failed (attempt ${attempt}):`,
          (err as Error).message
        );

        if (attempt === retryCount) {
          console.error(
            '🚨 Max retries reached. Could not connect to RabbitMQ.'
          );
          throw new Error(
            `RabbitMQ connection failed: ${(err as Error).message}`
          );
        }

        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }

    throw new Error('RabbitMQ connection failed after retries.');
  },

  async getChannel(): Promise<Channel> {
    if (!channel) {
      console.warn('⚠️ Channel not initialized. Trying to reconnect...');
      await this.connect();
    }
    return channel!;
  },

  async close() {
    try {
      await channel?.close();
      await connection?.close();
      console.log('🔌 RabbitMQ connection closed gracefully');
    } catch (err) {
      console.error(
        '⚠️ Error closing RabbitMQ connection:',
        (err as Error).message
      );
    } finally {
      channel = null;
      connection = null;
    }
  },
};
