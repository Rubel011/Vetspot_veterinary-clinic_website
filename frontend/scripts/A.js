let globalData = [];
let url = "https://vetspot.onrender.com";
let card_section = document.querySelector("#card-section");

// let clicked_service = localStorage.getItem("clicked_service");

// let user_name = localStorage.getItem("user_name") || "User";

// if(user_name=="User"){
//   alert("Please login first");
//   window.location.href="./loginsignup.html"
// }

// console.log(clicked_service);

function getWorkers() {
  fetch(`${url}/doctor/getAllDoc`,{ headers: {
    Authorization: localStorage.getItem("token")
}})
    .then((res) => res.json())
    .then((data) => {
      globalData = data.data;
      console.log(data.data);
      displayCard(data.data);
      totalEmployee(data.length);
    })
    .catch((err) => console.log(err));
}

getWorkers();

function displayCard(data) {
  let displayData = data.map((elem) => {
    return `
    <div class="card" data-set=${elem._id}>
          <div class="image-div">
            <div class="image-left">
              <div id="doc-img">
                <img
                  src="${elem.img}"
                  alt="user"
                />
              </div>
              <div class="name-info">
                <h3>${elem.name}</h3>
              </div>
            </div>
            <div class="menu">
              <span>...</span>
            </div>
          </div>
          <div class="InfoImg">
            <div class="InfoImgMid">
              <div>
                <p>Department</p>
                <b>${elem.specialization}</b>
              </div>
              <div>
                <p>Experience</p>
                <b>${elem.experience} Years +</b>
              </div>
            </div>
            <div class="InfoImgbottom">
              <h4>
              <img src="./images/email.png" alt="email" />
                ${elem.email}
              </h4>
              <h4>
              <img src="./images/call.png" alt="call" />
                ${elem.phone}
              </h4>
            </div>
          </div>
    </div>
    `;
  });
  card_section.innerHTML = displayData.join("");
  handleOnClick();
}

function totalEmployee(data) {
  let totalEmployee = document.getElementById("total-employee");
  totalEmployee.innerHTML = `<span>${data}</span> Employee`;
}

function handleFilterClick(event){
    let  buttonText = event.target.innerHTML;
    let filtereddata = globalData.filter((item)=>{
      return item.specialization.toLowerCase() == buttonText.toLowerCase()
    })
    console.log(typeof buttonText)
    // console.log(filtereddata);
    displayCard(filtereddata);
  }
  

// let sort = document.getElementById("price");
// sort.addEventListener("change", () => {
//   sortByPrice(globalData, sort.value);
// });

// function sortByPrice(data, sortType) {
//   if (sortType == "LTH") {
//     let sortedData = data.sort((a, b) => {
//       return a.rate - b.rate;
//     });
//     displayCard(sortedData);
//   } else {
//     let sortedData = data.sort((a, b) => {
//       return b.rate - a.rate;
//     });
//     displayCard(sortedData);
//   }
// }

// search function

// let search = document.getElementById("search");
// search.addEventListener("input", () => {
//   searchFunction(search.value);
// });

// function searchFunction(value) {
//   let result = [];
//   for (let i = 0; i < globalData.length; i++) {
//     if (globalData[i].name.includes(value)) {
//       result.push(globalData[i]);
//     }
//   }
//   displayCard(result);
//   totalEmployee(result.length);
// }

// highlighting text

let dashboard = document.querySelector(".container .dashboard");

let para = dashboard.childNodes;

for (let i = 1; i < para.length; i = i + 2) {
  para[i].addEventListener("click", () => {
    changeColor(i);
  });
}

function changeColor(index) {
  for (let i = 1; i < para.length; i = i + 2) {
    if (i == index) {
      para[i].classList.add("focused");
    } else {
      para[i].classList.remove("focused");
    }
  }
  console.log("done");
}

// console.log(dashboard.childNodes[1].innerHTML);

function handleOnClick() {
  let cards = document.getElementsByClassName("card");
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", () => {
      localStorage.setItem("profId", cards[i].dataset.set);
      // console.log(cards[i].dataset.set)
      window.location.href = "slot.html";
    });
  }
}

function redirect() {
  window.location.href = "index.html";
}

let user = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = user;

// home --> bookappointment page ---> [cat]--> localstorage set (cat) ---> doctor
