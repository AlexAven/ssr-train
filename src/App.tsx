import React, { useState } from 'react';
import styled from 'styled-components';

import { AppProps } from './types';

const Container = styled.div`
  padding: 40px;
  max-width: 500px;
  border: 1px solid #cac8c8;
  box-shadow: 2px 3px 7px #9d9b9b;
  border-radius: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 15px;
  border: 1px solid #cac8c8;
  background-color: #d3d1d1;

  &:hover {
    background-color: #b8b4b4;
  }
`;
  
const Li = styled.li<{ $isCompleted: boolean }>`
  color: ${({ $isCompleted }) => ($isCompleted ? 'green' : 'red')};
`;

const App: React.FC<AppProps> = ({ todos }) => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <Container>
      <h1>SSR-train</h1>
      <p>Это страница отрендерина на сервере. Данные с API получены также на сервере.</p>
      <Button onClick={handleClick}>{visible ? 'Скрыть данные API' : 'Показать данные API'}</Button>
      {visible && (
        <ul>
          {todos.map((todo) => (
            <Li key={todo.id} $isCompleted={todo.completed}>
              {todo.title} — {todo.completed ? '✅' : '❌'}
            </Li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default App;
