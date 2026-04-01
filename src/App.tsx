import React, { useState } from 'react';

import { AppProps } from './types';

const App: React.FC<AppProps> = ({ todos }) => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <div className='container'>
      <h1>SSR-train</h1>
      <p>Это страница отрендерина на сервере. Данные с API получены также на сервере.</p>
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
