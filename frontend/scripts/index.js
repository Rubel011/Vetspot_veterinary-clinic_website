let userDetails = JSON.parse(localStorage.getItem("userDetails")) || null;
let link_redirect = document.getElementById("link_redirect");
link_redirect.addEventListener("click", () => { redirectModule("./appointment.html") });

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
