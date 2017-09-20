/* eslint-disable no-console */
/* eslint-disable no-undef */
window.client = (function () {
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const error = new Error(`HTTP Error ${response.statusText}`);
      error.status = response.statusText;
      error.response = response;
      console.log(error);
      throw error;
    }
  }

  function parseJSON(response) {
    return response.json();
  }

    function getTodos(success) {
        return fetch('/api/todos', {
            headers: {
                Accept: 'application/json'
            },
        }).then(checkStatus)
            .then(parseJSON)
            .then(success);
    }

    function deleteTodos(data) {
        return fetch('/api/todos', {
            method: 'delete',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(checkStatus);
    }

    function createTodo(data) {
        return fetch('/api/todos', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(checkStatus);
    }

    function updateTodo(data) {
        return fetch('/api/todos', {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(checkStatus);
    }

    function moveTask(data) {
        return fetch('/api/todos/moveTask', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(checkStatus);
    }

  return {
    getTodos,
    deleteTodos,
    createTodo,
    updateTodo,
    moveTask
  };
}());
