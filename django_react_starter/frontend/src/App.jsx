import React, { useEffect, useState } from 'react';

const todoItems = [
  {
    id: 1,
    title: 'Go to Market',
    description: 'Buy ingredients to prepare dinner',
    completed: true,
  },
  {
    id: 2,
    title: 'Study',
    description: 'Read Algebra and History textbook for the upcoming test',
    completed: false,
  },
  {
    id: 3,
    title: "Sammy's books",
    description: "Go to library to return Sammy's books",
    completed: true,
  },
  {
    id: 4,
    title: 'Article',
    description: 'Write article on how to use Django with React',
    completed: false,
  },
];

const App = () => {
  const [todoList, setTodoList] = useState([{}]);
  const [viewCompleted, setViewCompleted] = useState(false);

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
          <button className="btn btn-secondary mr-2">Edit</button>
          <button className="btn btn-danger">Delete</button>
        </span>
      </li>
    ));
  };

  useEffect(() => {
    setTodoList(todoItems);
  }, []);

  return (
    <main className="container">
      <h1 className="text-black text-uppercase text-center my-4">Todo app</h1>
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="mb-4">
              <button className="btn btn-primary">Add task</button>
            </div>
            {renderTabList()}
            <ul className="list-group list-group-flush border-top-0">
              {renderItems()}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
