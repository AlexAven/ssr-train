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
      <button className="button" onClick={handleClick}>
        {visible ? 'Скрыть данные API' : 'Показать данные API'}
      </button>
      {visible && (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? 'completed' : 'incompleted'}>
              {todo.title} — {todo.completed ? '✅' : '❌'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
