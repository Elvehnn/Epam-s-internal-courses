import { Action, Todo } from '../Interfaces';
import {
  ADD_TODO,
  DELETE_TODO,
  FILTER_OPTIONS,
  TOGGLE_TODO,
  TOGGLE_ALL_TODO,
  CLEAR_COMPLETED_TODOS,
  EDIT_TODO,
} from './actions';
import { combineReducers } from '@reduxjs/toolkit';
import { routerReducer } from 'react-router-redux';

const storedTodos = localStorage.getItem('todos');

export const todos = (
  state: Todo[] = storedTodos ? JSON.parse(storedTodos) : [],
  action: Action
): Todo[] => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: state.length,
          todo: action.text || '',
          completed: false,
        },
      ];

    case CLEAR_COMPLETED_TODOS: {
      const activeTodos = state.filter((item) => !item.completed);

      return activeTodos.map((item, index) => {
        return { ...item, id: index };
      });
    }

    case DELETE_TODO: {
      const newTodos = state.filter((item) => item.id !== action.index);

      return newTodos.map((item, index) => {
        return { ...item, id: index };
      });
    }

    case TOGGLE_TODO:
      return state.map((item: Todo, index) => {
        if (index === action.index) {
          return { ...item, completed: !item.completed };
        }
        return item;
      });

    case EDIT_TODO:
      return state.map((item: Todo, index) => {
        if (index === action.newTodo?.id) {
          return { ...item, todo: action.newTodo.todo };
        }
        return item;
      });

    case TOGGLE_ALL_TODO:
      return state.map((item: Todo) => {
        return { ...item, completed: action.isChecked };
      });

    default:
      return state;
  }
};

export const filter = (state = FILTER_OPTIONS.SHOW_ALL, action: Action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter;

    default:
      return state;
  }
};

export const allButtonChecked = (state = false, action: Action) => {
  switch (action.type) {
    case 'SELECT_ALL_ITEM_BUTTON':
      return action.isChecked;

    default:
      return state;
  }
};

const rootReducer = combineReducers({ routerReducer, todos, filter, allButtonChecked });

export default rootReducer;
