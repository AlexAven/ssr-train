import redisClient from './redis-client';

export const saveStringToRedis = async (key: string, data: string, ttl = 60): Promise<void> => {
  await redisClient.set(key, data, { EX: ttl });
  console.log(`Данные записаны в Redis по ключу "${key}"`);
};

export const getStringFromRedis = async (key: string): Promise<string | null> => {
  const data = await redisClient.get(key);

  if (data !== null) {
    console.log(`Кэш получен из Redis по ключу "${key}"`);
    return data;
  }

  console.log(`Кэш не найден в Redis по ключу "${key}"`);
  return null;
};
