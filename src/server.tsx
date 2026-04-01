import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import path from 'path';

import App from './App';

import { Todo } from './types';

const app = express();
const PORT = 3000;

// Отдаём собранный клиентский бандл как статику
app.use('/static', express.static(path.resolve(__dirname, '../dist/client')));

app.get('/', async (_req, res) => {
  // 1. Делаем запрос к бесплатной API НА СТОРОНЕ СЕРВЕРА
  //    Клиент этот запрос не делает — он получает готовые данные
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
  const todos: Todo[] = await response.json();

  // 2. Рендерим React-компонент в HTML-строку (это и есть SSR)
  const appHtml = renderToString(<App todos={todos} />);

  // 3. Передаём данные клиенту через window.__DATA__,
  //    чтобы React на клиенте мог "гидрировать" компонент с теми же данными
  const html = `
    <!DOCTYPE html>
    <html lang="ru">
      <head>
        <meta charset="UTF-8" />
        <title>SSR Demo</title>
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

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
