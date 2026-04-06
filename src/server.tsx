import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { initRedis } from './redis-client';
import path from 'path';

import App from './App';
import { getStringFromRedis, saveStringToRedis } from './redis-utils';

import { Todo } from './types';

const app = express();
const PORT = 3000;

app.use('/static', express.static(path.resolve(__dirname, '../dist/client')));

app.get('/', async (req, res) => {
  const cacheKey = req.originalUrl;

  try {
    const cachedHtml = await getStringFromRedis(cacheKey);

    if (cachedHtml) {
      res.send(cachedHtml);

      return;
    }

    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
    const todos: Todo[] = await response.json();

    const appHtml = renderToString(<App todos={todos} />);

    const html = `
      <!DOCTYPE html>
      <html lang="ru">
        <head>
          <meta charset="UTF-8" />
          <title>SSR Demo</title>
          <link rel="stylesheet" href="static/styles.css" />
        </head>
        <body>
          <div id="root">${appHtml}</div>
          <script>
            window.__SSR_PROPS__ = ${JSON.stringify(todos)};
          </script>
          <script src="/static/client.js"></script>
        </body>
      </html>
    `;

    await saveStringToRedis(cacheKey, html);

    res.send(html);
  } catch (error) {
    console.error('Ошибка при обработке запроса:', error);
    res.status(500).send('Ошибка сервера');
  }
});

const runServer = async () => {
  try {
    await initRedis();

    app.listen(PORT, () => {
      console.log(`Сервер запущен: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Ошибка при запуске сервера:', error);
  }
};

runServer();
