const loginButton = document.querySelector("#login-button");
const clearFiltersButton = document.querySelector("#clear-filters-button");
const searchInput = document.querySelector("#search");
const urgencySelect = document.querySelector("#urgency-select");
const statusSelect = document.querySelector("#status-select");
const logoutButton = document.querySelector("#logout-button");


//=============== S
const createVisitButton = document.getElementById("create-visit-button");
//================

window.onload = () => {
  console.log(localStorage.getItem("token"));
  if (localStorage.getItem("token")) {
    document.querySelector("#login-button").classList.add("button--hidden");
    document.querySelector("#signup-button").classList.add("button--hidden");
    document.querySelector("#logout-button").classList.remove("button--hidden");
    document
      .querySelector("#create-visit-button")
      .classList.remove("button--hidden");
    document.querySelector(".main").classList.remove("main--hidden");
  }
};

loginButton.addEventListener("click", () => {
  const loginModal = new LoginModal();
  loginModal.render();
});

logoutButton.addEventListener("click", () => {
  localStorage.removeItem("token");
  location.reload();
});

clearFiltersButton.addEventListener("click", () => {
  searchInput.value = "";
  urgencySelect.selectedIndex = 0;
  statusSelect.selectedIndex = 0;
});

document.querySelector("#signup-button").addEventListener("click", () => {
  window.location.href =
    "https://ajax.test-danit.com/front-pages/cards-register.html";
});


//============== S
createVisitButton.addEventListener("click", () => {
  console.log("test");
  const createVisitModal = new CreateVisitModal();  
  createVisitModal.render();
})