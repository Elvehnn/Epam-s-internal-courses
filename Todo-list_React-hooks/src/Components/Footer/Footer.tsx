import { useState, useEffect } from 'react';
import { FooterProps, FooterState } from '../../Interfaces';
import './Footer.scss';

const Footer = ({ todoList, onUpdateTodoList, onChangeFilter }: FooterProps) => {
  const [filterOptions, setFilterActive] = useState<FooterState[]>([
    {
      title: 'All',
      isActive: true,
    },
    {
      title: 'Active',
      isActive: false,
    },
    {
      title: 'Completed',
      isActive: false,
    },
  ]);

  const activeFilter = filterOptions.find((item) => item.isActive === true);
  const newFilterValue = activeFilter ? activeFilter.title : 'All';

  useEffect(() => {
    onChangeFilter(newFilterValue);
  }, [filterOptions, newFilterValue, onChangeFilter]);

  const clearCompletedTodos = () => {
    const todosToRemove = todoList.filter((item) => item.completed === true);

    onUpdateTodoList(todosToRemove);
  };

  const getFilterValue = (event: any): void => {
    const newFilterValue = event.target.innerText;
    const newState = filterOptions.map((item) => {
      return { ...item, isActive: item.title === newFilterValue ? true : false };
    });

    setFilterActive([...newState]);
  };

  const completedTodosList = todoList.filter((item) => item.completed === !true);

  return (
    <div className="footer">
      <span className="footer__todo-counter">{completedTodosList.length} items left</span>

      <ul className="filters">
        {filterOptions.map(({ title, isActive }, index) => (
          <li
            key={index}
            className={isActive ? 'active' : ''}
            onClick={(event) => getFilterValue(event)}
          >
            <a href="#/">{title}</a>
          </li>
        ))}
      </ul>

      <button className="footer__clear-button" onClick={clearCompletedTodos}>
        Clear completed
      </button>
    </div>
  );
};

export default Footer;
