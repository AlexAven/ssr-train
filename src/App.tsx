import React, { useState } from 'react';

import { AppProps } from './types';

const App: React.FC<AppProps> = ({ todos }) => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <div
      style={{
        padding: '40px',
        maxWidth: '500px',
        border: '1px solid #cac8c8',
        boxShadow: '2px 3px 7px #9d9b9b',
        borderRadius: '20px'
      }}
    >
      <h1>SSG-train</h1>
      <p>Это страница отрендерина при сборке с помощью SSG. Данные с API получены также при сборке.</p>
      <button style={{ padding: '10px 20px', fontSize: '16px' }} onClick={handleClick}>
        {visible ? 'Скрыть данные API' : 'Показать данные API'}
      </button>
      {visible && (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} style={{ color: todo.completed ? 'green' : 'red' }}>
              {todo.title} — {todo.completed ? '✅' : '❌'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
