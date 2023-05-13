let globalData = [];

let card_section = document.querySelector("#card-section");

// let clicked_service = localStorage.getItem("clicked_service");

// let user_name = localStorage.getItem("user_name") || "User";

// if(user_name=="User"){
//   alert("Please login first");
//   window.location.href="./loginsignup.html"
// }

// console.log(clicked_service);

function getWorkers() {
  fetch(`https://troubled-pig-life-jacket.cyclic.app/doctor/getAllDoc`,{ headers: {
    Authorization: localStorage.getItem("token")
}})
    .then((res) => res.json())
    .then((data) => {
      globalData = data.data;
      console.log(data.data);
      displayCard(data.data);
      // totalEmployee(data.length);
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
}



function handleFilterClick(event){
  let  buttonText = event.target.innerHTML;
  let filtereddata = globalData.filter((item)=>{
    return item.specialization.toLowerCase() == buttonText.toLowerCase()
  })
  console.log(typeof buttonText)
  console.log(filtereddata);
  displayCard(filtereddata);
}


