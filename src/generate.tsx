import React from 'react';
import { renderToString } from 'react-dom/server';
import fs from 'fs';
import path from 'path';

import App from './App';

import { Todo } from './types';

async function generate() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
  const todos: Todo[] = await response.json();

  const appHtml = renderToString(<App todos={todos} />);

  const html = `<!DOCTYPE html>
  <html lang="ru">
    <head>
      <meta charset="UTF-8" />
      <title>SSG Demo</title>
    </head>
    <body>
      <div id="root">${appHtml}</div>
      <script>
        window.__SSG_PROPS__ = ${JSON.stringify(todos)};
      </script>
      <script src="/static/client.js"></script>
    </body>
  </html>`;

  const outputDir = path.resolve(__dirname, '../dist/client');
  fs.mkdirSync(outputDir, { recursive: true });

  const outputPath = path.join(outputDir, 'index.html');
  fs.writeFileSync(outputPath, html, 'utf-8');
};

generate().catch((error) => {
  console.error('Ошибка при генерации:', error);
  process.exit(1);
});
