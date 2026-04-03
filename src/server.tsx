import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';

import path from 'path';

import App from './App';

import { Todo } from './types';

const app = express();
const PORT = 3000;

app.use('/static', express.static(path.resolve(__dirname, '../dist/client')));

app.get('/', async (_req, res) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
  const todos: Todo[] = await response.json();

  const sheet = new ServerStyleSheet();

  try {
    const appHtml = renderToString(sheet.collectStyles(<App todos={todos} />));

    const styleTags = sheet.getStyleTags();

    const html = `
      <!DOCTYPE html>
      <html lang="ru">
        <head>
          <meta charset="UTF-8" />
          <title>SSR Demo</title>
          ${styleTags}
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
  } finally {
    sheet.seal();
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
