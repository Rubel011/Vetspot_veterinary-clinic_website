document.getElementById("signup-toggle").addEventListener("click", function () {
    document.getElementById("login-form").classList.remove("active");
    document.getElementById("signup-form").classList.add("active");
});

document.getElementById("login-toggle").addEventListener("click", function () {
    document.getElementById("signup-form").classList.remove("active");
    document.getElementById("login-form").classList.add("active");
});

let url = "https://vetspot.onrender.com"
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const usernameInput = document.getElementById("loginemail");
    // const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.getElementById("loginPassword");
    const email = usernameInput.value;
    // const email = emailInput.value;
    const password = passwordInput.value;
    const data = { email: email, password: password };
    console.log(data)
    if (password && username != "") {
        fetch(`${url}/user/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                localStorage.setItem("token", res.accessToken)
                if (res.success) {
                    localStorage.setItem("userDetails", JSON.stringify(res.data))
                    Swal.fire(
                        'Good job!',
                        'Successfully LoggedIn ',
                        'success'
                    )
                    setTimeout(() => {
                        window.location.href = "index.html"
                    }, 1000)


                } else {
                    errorMessage(res.message)
                }
            })
            .catch(error => {
                console.error(error);
                alert("Invalid Credentials")
            });
    } else {
        errorMessage('please fill all details')
    }

});


const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("Password");
    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const data = { name: username, email: email, password: password };
    console.log(data)
    if (email && password && username != "") {
        fetch(`${url}/user/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.success) {
                    Swal.fire(
                        'Good job!',
                        'User Successfully Registered',
                        'success'
                    )
                    setTimeout(() => {
                        document.getElementById("signup-form").classList.remove("active");
                        document.getElementById("login-form").classList.add("active");
                    }, 1000)
                } else {
                    errorMessage(res.message)
                }

            })
            .catch((error) => {
                console.error(error);
            });
    } else {
        errorMessage('please fill all details')
    }

});


function errorMessage(text) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: text,
        footer: '<a href="">Why do I have this issue?</a>'
    })
}