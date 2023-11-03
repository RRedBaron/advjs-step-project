const createCardBtn = document.querySelector('#create-visit-button');
const loginButton = document.querySelector("#login-button");
const clearFiltersButton = document.querySelector("#clear-filters-button");
const searchInput = document.querySelector("#search");
const urgencySelect = document.querySelector("#urgency-select");
const statusSelect = document.querySelector("#status-select");
const logoutButton = document.querySelector("#logout-button");


window.onload = () => {
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


createCardBtn.addEventListener("click", () => {
  let visit = null;

  const selectTypeDoctor = new SelectDoctor();

  selectTypeDoctor.selectDoctor.addEventListener("change", (e) => {
    if (visit) {
      visit.changeDoctor();
    }

    const doctor = e.target.value;

    if (doctor === "cardiologist") {
      visit = new VisitCardiologist("Кардіолог");
      visit.render(".modal-select__body");

    } else if (doctor === "dentist") {
      visit = new VisitDentist("Стоматолог");
      visit.render(".modal-select__body");

    } else if (doctor === "therapist") {
      visit = new VisitTherapist("Терапевт");
      visit.render(".modal-select__body");
    }
  });

  const confirmUser = async (close) => {
    const body = visit?.getValues();
    const response = await card.createCard(body);

    if (response) {
      await card?.getAllCards();
      close();
    }
  };

  new ModalWindow(selectTypeDoctor.getFormElement(), "Створити візит", "Створити", confirmUser).render();
});


