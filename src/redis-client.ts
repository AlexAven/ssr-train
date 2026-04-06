import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://localhost:6379',
});

export const initRedis = async () => {
  redisClient.on('error', (error) => {
    console.log('Ошибка Redis',  error);
  });

  redisClient.on('connect', () => {
    console.log('Redis запущен');
  });

  await redisClient.connect();
};

export default redisClient;
