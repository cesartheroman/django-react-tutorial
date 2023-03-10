import React, { useEffect, useState } from 'react';

import CustomModal from './components/Modal';

const App = () => {
  const [todoList, setTodoList] = useState([{}]);
  const [viewCompleted, setViewCompleted] = useState(false);
  const [modal, setModal] = useState(false);
  const [activeItem, setActiveItem] = useState({
    title: '',
    description: '',
    completed: false,
  });

  useEffect(() => {
    refreshList();
  }, []);

  const refreshList = async () => {
    try {
      const getTodoList = await fetch('/api/todos/');
      const todos = await getTodoList.json();
      setTodoList((todoList) => todos);
    } catch (e) {
      console.error(e);
    }
  };

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = async (item) => {
    toggle();

    try {
      if (item.id) {
        const myRequest = new Request(`/api/todos/${item.id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        });

        await fetch(myRequest);

        refreshList();
        return;
      }

      const myRequest = new Request('/api/todos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      const postTodo = await fetch(myRequest);
      refreshList();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (item) => {
    try {
      const options = {
        method: 'DELETE',
      };

      await fetch(`/api/todos/${item.id}`, options);

      refreshList();
    } catch (e) {
      console.error(e);
    }
  };

  const createItem = () => {
    const item = {
      title: '',
      description: '',
      completed: false,
    };

    setActiveItem(item);
    setModal(!modal);
  };

  const editItem = (item) => {
    setActiveItem(item);
    setModal(!modal);
  };

  const displayCompleted = (status) => {
    if (status) {
      return setViewCompleted(true);
    }

    return setViewCompleted(false);
  };

  const renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          className={viewCompleted ? 'nav-link active' : 'nav-link'}
          onClick={() => displayCompleted(true)}
        >
          Complete
        </span>

        <span
          className={viewCompleted ? 'nav-link' : 'nav-link active'}
          onClick={() => displayCompleted(false)}
        >
          Incomplete
        </span>
      </div>
    );
  };

  const renderItems = () => {
    const newItems = todoList.filter((item) => {
      return item.completed === viewCompleted;
    });

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${viewCompleted ? 'completed-todo' : ''}`}
          title={item.description}
        >
          {item.title}
        </span>

        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => editItem(item)}
          >
            Edit
          </button>
          <button className="btn btn-danger" onClick={() => handleDelete(item)}>
            Delete
          </button>
        </span>
      </li>
    ));
  };

  return (
    <main className="container">
      <h1 className="text-black text-uppercase text-center my-4">Todo app</h1>
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="mb-4">
              <button className="btn btn-primary" onClick={createItem}>
                Add task
              </button>
            </div>
            {renderTabList()}
            <ul className="list-group list-group-flush border-top-0">
              {renderItems()}
            </ul>
          </div>
        </div>
      </div>
      {modal && (
        <CustomModal
          activeItem={activeItem}
          toggle={toggle}
          onSave={handleSubmit}
        />
      )}
    </main>
  );
};

export default App;
