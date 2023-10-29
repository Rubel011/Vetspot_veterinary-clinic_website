const myform = document.getElementById("form");
let url = "https://vetspot.onrender.com";
myform.addEventListener("submit", (event) => {
    event.preventDefault();

    const petName = document.getElementById("pet-name").value;
    const ownerName = document.getElementById("owner-name").value;
    const phoneNumber = document.getElementById("phone-number").value;
    const email = document.getElementById("email").value;
    const appointmentDate = document.getElementById("appointment-date").value;
    const appointmentTime = document.getElementById("appointment-time").value;
    const reasonForVisit = document.getElementById("reason-for-visit").value;

    const appointment = {
        petName,
        ownerName,
        phoneNumber,
        email,
        appointmentDate,
        appointmentTime,
        reasonForVisit,
    };
    postAppointment(appointment);
    // console.log(appointment);

    // Add code to send appointment data to server or store in database
});

function postAppointment(formDataObject) {
    fetch(`${url}/Appointment/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(formDataObject),
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            if (res) {
                // alert(res.msg)

                Swal.fire("Good job!", "Successfully user added", "success");
                setTimeout(() => {
                    window.location.href = `doctor.html?type=${formDataObject.petName}`;
                }, 1000);
            } else {
                // alert(res.message)

                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "User Already Exists",
                    footer: '<a href="">Why do I have this issue?</a>',
                });
            }
        })
        .catch((error) => {
            console.log(error);
        });
}
