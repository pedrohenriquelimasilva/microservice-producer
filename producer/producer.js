import { Kafka } from 'kafkajs'
import { randomUUID } from 'node:crypto'

async function bootstrap() {
  const kafka = new Kafka({
    clientId: 'test-notification',
    brokers: ['certain-flea-6444-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username:
        'Y2VydGFpbi1mbGVhLTY0NDQkjw2iB40aGLNVMb4FNdOSUDcn0bxZd3LBKdIWzJI',
      password:
        'c9JV68ZMy9o05sR94-7lTRFX2btdqR5_XQlFs5_Cgk32DJnm5hoj1BKomNOZtKDlm2btQA=='
    },
    ssl: true
  })

  const producer = kafka.producer()

  await producer.connect()
  await producer.send({
    topic: 'notifications.send-notification',
    value: JSON.stringify({
      content: 'Nova solicitação para amizade',
      category: 'social',
      recipientId: randomUUID()
    })
  })

  await producer.disconnect()
}

bootstrap()
