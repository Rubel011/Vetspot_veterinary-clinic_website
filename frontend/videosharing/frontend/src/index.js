import { navbar, footer } from "../../../components/navbar.js";
document.getElementById("navbar").innerHTML = navbar();
document.getElementById("footer").innerHTML = footer();

const roomID = document.getElementById("roomID");
const joinRoom = document.getElementById("joinRoom");
joinRoom.onclick = (e) => {
  e.preventDefault();

  const RoomID = roomID.value;

  localStorage.setItem("RoomID", RoomID);

  window.location.href = "./chat.html";
};

let logo = document.getElementById("logo");
let userDetails = JSON.parse(localStorage.getItem("userDetails")) || null;
// redirect to account/login
let login_icon = document.getElementById("loginbtn");
let navRedirect = document.getElementById("navredirect");
let viewApp = document.getElementById("viewApp");
let adminbtn = document.getElementById("adminbtn");
let videoCall = document.getElementById("videoCall");
let url = "https://vetspot.onrender.com";

// Home redirect
logo.addEventListener("click", () => {
  window.location.href = "../../index.html";
});

// setting username
if (userDetails) {
  document.getElementById("userName").innerText = `👏Hi, ${userDetails?.name}`;
  document.getElementById("loginbtn").innerText = "Logout";
}

navRedirect.addEventListener("click", () => {
  redirectModule("../../appointment.html");
});

viewApp.addEventListener("click", () => {
  redirectModule("../../doctor.html");
});
videoCall.addEventListener("click", () => {
  redirectModule("index.html");
});
adminbtn.addEventListener("click", () => {
  if (!userDetails) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Please Login First",
      showConfirmButton: true,
    });
    return;
  }
  if (userDetails.role == "admin") {
    window.location.href = "../../admin.html";
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Your are not Authorize",
      showConfirmButton: true,
    });
  }
});

login_icon.addEventListener("click", () => {
  if (userDetails) {
    fetch(`${url}/user/logout`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.removeItem("userDetails");
        localStorage.removeItem("token");
        window.location.href = "../../index.html";
      })
      .catch((err) => console.log(err));
  } else {
    window.location.href = "../../login.html";
  }
});

function redirectModule(location) {
  if (userDetails) {
    window.location.href = location;
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Please Login First",
      showConfirmButton: true,
    });
  }
}
