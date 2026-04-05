import React from 'react';
import { hydrateRoot } from 'react-dom/client';

import App from './App';

import { Todo } from './types';

const todos: Todo[] = (window as any).__SSG_PROPS__;

hydrateRoot(document.getElementById('root')!, <App todos={todos} />);
