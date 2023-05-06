const todosTable = document.querySelector('#todosTable tbody');
const addTodoForm = document.querySelector('#addTodoForm');
const editTodoModal = document.querySelector('#editTodoModal');
const closeEditModalBtn = document.querySelector('#closeEditModal');
const editTodoForm = document.querySelector('#editTodoForm');
let todos = [];

// Retrieve todos from API and display them in the table
function getTodos() {
    fetch('http://localhost:3000/user/all')
        .then(response => response.json())
        .then(data => {
            todos = data.data;
            // console.table(todos)
            renderTodos();
            console.log(todos)
            console.log(todos.length)
        })
        .catch(error => console.error(error));
}

// Render todos in the table
function renderTodos() {
    todosTable.innerHTML = '';
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${todo._id}</td>
            <td>${todo.name}</td>
            <td>${todo.email}</td>
            <td>

                <button class="deleteTodoBtn" data-id="${todo._id}">Delete</button>
                
            </td>
        `;
        todosTable.appendChild(row);
    }
}

// Add new todo
// addTodoForm.addEventListener('submit', event => {
//     event.preventDefault();
//     const title = addTodoForm.title.value;
//     fetch('https://jsonplaceholder.typicode.com/users', {
//         method: 'POST',
//         body: JSON.stringify({
//             title,
//             completed: false
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         todos.push(data);
//         renderTodos();
//         addTodoForm.reset();
//     })
//     .catch(error => console.error(error));
// });

// Edit todo
// let editTodoId = null;
// todosTable.addEventListener('click', event => {
//     if (event.target.classList.contains('editTodoBtn')) {
//         editTodoId = parseInt(event.target.dataset.id);
//         const todo = todos.find(todo => todo.id === editTodoId);
//         editTodoForm.title.value = todo.title;
//         editTodoModal.style.display = 'block';
//     }
// });

// editTodoForm.addEventListener('submit', event => {
//     event.preventDefault();
//     const title = editTodoForm.title.value;
//     fetch(`https://jsonplaceholder.typicode.com/todos/${editTodoId}`, {
//         method: 'PUT',
//         body: JSON.stringify({
//             title,
//             completed: false
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         const index = todos.findIndex(todo => todo.id === editTodoId);
//         todos[index] = data;
//         renderTodos();
//         editTodoModal.style.display = 'none';
//         editTodoId = null;
//     })
//     .catch(error => console.error(error));
// });

// closeEditModalBtn.addEventListener('click', event => {
//     editTodoModal.style.display = 'none';
//     editTodoId = null;
// });

// editTodoForm.addEventListener('submit', event => {
//     event.preventDefault();
//     const title = editTodoForm.title.value;
//     fetch(`https://jsonplaceholder.typicode.com/users/${editTodoId}`, {
//         method: 'PUT',
//         body: JSON.stringify({
//             title,
//             completed: false
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         const index = todos.findIndex(todo => todo.id === editTodoId);
//         todos[index] = data;
//         renderTodos();
//         editTodoModal.style.display = 'none';
//         editTodoId = null;
//     })
//     .catch(error => console.error(error));
// });
// Delete todo

todosTable.addEventListener('click', (event) => {
    if (event.target.classList.contains('deleteTodoBtn')) {
        const todoId = (event.target.dataset.id);
        fetch(`http://localhost:3000/user/delete/${todoId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    const index = todos.findIndex(todo =>
                        todo._id === todoId);
                    todos.splice(index, 1);
                    renderTodos();
                }
            })
            .catch(error => console.error(error));
    }
});

// Initialize the application
getTodos();
