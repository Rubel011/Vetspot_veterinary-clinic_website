const todosTable = document.querySelector('#todosTable tbody');
const doctortodosTable = document.querySelector('#doctortodosTable tbody')
const addTodoForm = document.querySelector('#addTodoForm');
const editTodoModal = document.querySelector('#editTodoModal');
const closeEditModalBtn = document.querySelector('#closeEditModal');
const editTodoForm = document.querySelector('#editTodoForm');
var totaluser = document.getElementById("totaluser")
var dtotaluser = document.getElementById("dtotaluser")
let todos = [];
let dtodos = [];
let url = "https://vetspot.onrender.com";
// Retrieve todos from API and display them in the table
function getTodos() {
    fetch(`${url}/user/all`, {
        method: 'GET',
        //  credentials: 'same-origin' 
        headers: {
            // cookie: `token=${localStorage.getItem("token")}`
            Authorization: localStorage.getItem("token")
        }
    })
        .then(response => response.json())
        .then(data => {
            todos = data.data;
            // console.table(todos)
            renderTodos();
            console.log(todos)
            console.log(todos.length)
            totaluser.innerHTML = todos.length
        })
        .catch((error) => console.log(error));
}

// Render todos in the table
function renderTodos() {
    todosTable.innerHTML = null;
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

// Delete todo

todosTable.addEventListener('click', (event) => {
    // event.preventDefault()
    if (event.target.classList.contains('deleteTodoBtn')) {
        const todoId = (event.target.dataset.id);
        // console.log(localStorage.getItem("token"));
        fetch(`${url}/user/delete/${todoId}`, {
            method: 'DELETE',
            // credentials: 'include' ,
            headers: {
                // "cookie":`token=${token}`
                Authorization: localStorage.getItem("token")
            }
        }).then(res => res.json())
            .then(response => {
                if (response.msg) {
                    Swal.fire(
                        'Successfully deleted',
                        'You clicked the button!',
                        'success'
                    )
                    // const index = todos.findIndex(todo =>
                    //     todo._id === todoId);
                    // todos.splice(index, 1);
                    // renderTodos();
                    getTodos()
                }
            })
            .catch(error => console.error(error));
    }
});

// Initialize the application
getTodos();

//user data add
const openFormButton = document.getElementById('openFormButton');
const loginFormContainer = document.getElementById('loginFormContainer');
const loginForm = document.getElementById('loginForm');

openFormButton.addEventListener('click', function () {
    loginFormContainer.style.display = 'block';
});

loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    const formData = new FormData(loginForm);

    // Convert form data to object
    const formDataObject = {};
    formData.forEach(function (value, key) {
        formDataObject[key] = value;
    });

    // Log form data
    console.log(formDataObject);

    // Perform login logic here...
    // ...
    if (email && password != "") {
        fetch(`${url}/user/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formDataObject)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res) {
                    // alert(res.msg)

                    Swal.fire(
                        'Good job!',
                        'Successfully user added',
                        'success'
                    )
                    getTodos();

                } else {
                    // alert(res.message)

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'User Already Exists',
                        footer: '<a href="">Why do I have this issue?</a>'
                    })
                }

            })
            .catch(error => {

                console.error(error);
            });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'please fill all details',
            footer: '<a href="">Why do I have this issue?</a>'
        })
        // alert("please fill all details")
    }

    // Close the form
    loginFormContainer.style.display = 'none';
});

//dark them
function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}

//toggle apply in user doctor and appoinment div==========



function userdiv() {
    var userdiv = document.getElementById("userdiv");
    var doctordiv = document.getElementById("doctordiv");
    var appointmentdiv = document.getElementById("appointmentdiv");
    if (userdiv.style.display === "none") {
        userdiv.style.display = "block";
        doctordiv.style.display = "none";
        appointmentdiv.style.display = "none";
    } else {
        userdiv.style.display = "none";
    }
}

function doctordiv() {
    var userdiv = document.getElementById("userdiv");
    var doctordiv = document.getElementById("doctordiv");
    var appointmentdiv = document.getElementById("appointmentdiv");
    if (doctordiv.style.display === "none") {
        doctordiv.style.display = "block";
        appointmentdiv.style.display = "none";
        userdiv.style.display = "none";
    } else {
        doctordiv.style.display = "none";
    }
}
function appointmentdiv() {
    var userdiv = document.getElementById("userdiv");
    var doctordiv = document.getElementById("doctordiv");
    var appointmentdiv = document.getElementById("appointmentdiv");
    if (appointmentdiv.style.display === "none") {
        appointmentdiv.style.display = "block";
        userdiv.style.display === "none";
        doctordiv.style.display = "none";
    } else {
        appointmentdiv.style.display = "none";
    }
}




//////doctor get all the data
function getDoctorTodos() {
    fetch(`${url}/doctor/getAllDoc`, {
        method: 'GET',
        //  credentials: 'same-origin' 
        headers: {
            // cookie: `token=${localStorage.getItem("token")}`
            Authorization: localStorage.getItem("token")
        }
    })
        .then(response => response.json())
        .then(data => {
            dtodos = data.data;
            // console.table(todos)
            renderdoctorTodos();
            console.log(dtodos)
            console.log(dtodos.length)
            dtotaluser.innerHTML = dtodos.length
        })
        .catch((error) => console.log(error));
}
// Render todos in the table
function renderdoctorTodos() {
    doctortodosTable.innerHTML = null;
    for (let i = 0; i < dtodos.length; i++) {
        const todo = dtodos[i];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${todo._id}</td>
            <td>${todo.name}</td>
            <td>${todo.email}</td>
            <td>${todo.experience}</td>
            <td>${todo.specialization}</td>
            <td>

                <button class="deleteTodoBtn" data-id="${todo._id}">Delete</button>
                
            </td>
        `;
        doctortodosTable.appendChild(row);
    }
}
// Delete todo

doctortodosTable.addEventListener('click', (event) => {
    // event.preventDefault()
    if (event.target.classList.contains('deleteTodoBtn')) {
        const todoId = (event.target.dataset.id);
        // console.log(localStorage.getItem("token"));
        fetch(`${url}/doctor/delete/${todoId}`, {
            method: 'DELETE',
            // credentials: 'include' ,
            headers: {
                // "cookie":`token=${token}`
                Authorization: localStorage.getItem("token")
            }
        }).then(res => res.json())
            .then(response => {
                console.log(response)
                if (response.mss = "Docter") {
                    Swal.fire(
                        'Successfully deleted',
                        'You clicked the button!',
                        'success'
                    )
                    // const index = todos.findIndex(todo =>
                    //     todo._id === todoId);
                    // todos.splice(index, 1);
                    // renderTodos();
                    getDoctorTodos()
                }
            })
            .catch(error => console.error(error));
    }
});
getDoctorTodos()



const openDoctorFormButton = document.getElementById('openDoctorFormButton');
const logindoctorFormContainer = document.getElementById('logindoctorFormContainer');
const loginDForm = document.getElementById('loginDForm');


openDoctorFormButton.addEventListener('click', function () {
    logindoctorFormContainer.style.display = 'block';
});

loginDForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    const formData = new FormData(loginDForm);

    // Convert form data to object
    const formDataObject = {};
    formData.forEach(function (value, key) {
        formDataObject[key] = value;
    });

    // Log form data
    console.log(formDataObject);

    // Perform login logic here...
    // ...
    if (email && gender && img && age && experience && specialization != "") {
        fetch(`${url}/doctor/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("token") },
            body: JSON.stringify(formDataObject)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res) {
                    // alert(res.msg)

                    Swal.fire(
                        'Good job!',
                        'Successfully user added',
                        'success'
                    )
                    getDoctorTodos();

                } else {
                    // alert(res.message)

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'User Already Exists',
                        footer: '<a href="">Why do I have this issue?</a>'
                    })
                }

            })
            .catch(error => {

                console.error(error);
            });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'please fill all details',
            footer: '<a href="">Why do I have this issue?</a>'
        })
        // alert("please fill all details")
    }

    // Close the form
    logindoctorFormContainer.style.display = 'none';
});