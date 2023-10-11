class Modal {
  constructor() {
    this.div = null;
  }

  render() {
    this.div = document.createElement("div");
    this.div.classList.add("login-modal");
    this.div.innerHTML = `
    <div class="login-modal__content">
      <div class="login-modal__header">
        <h2 class="login-modal__title"></h2>
        <svg
            class="login-modal__close-button"
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
          >
            <path
              d="M26 1L13.5 13.5M1 26L13.5 13.5M13.5 13.5L26 26L1 1"
              stroke="black"
              stroke-width="2"
            />
          </svg>
      </div>
      <hr />
    </div>
    `;
  }

  close() {
    this.div.remove();
  }
}

class LoginModal extends Modal {
  constructor() {
    super();
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.close = this.close.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  render() {
    super.render();
    this.div.querySelector(".login-modal__title").textContent =
      "Вхід в особистий кабінет";
    this.div.querySelector(".login-modal__content").innerHTML += `
    <form class="login-modal__form">
      <span>Email адреса</span>
      <input
        id="email"
        type="text"
        placeholder="example@example.ua"
        required
      />
      <span>Пароль</span>
      <input id="password" type="password" placeholder="Пароль" required />
      <button type="submit" class="button button--green" id="login-submit-btn">Увійти</button>
    </form>
    `;

    const emailInput = this.div.querySelector("#email");
    const passwordInput = this.div.querySelector("#password");
    const closeButton = this.div.querySelector(".login-modal__close-button");
    const loginButton = this.div.querySelector("#login-submit-btn");

    closeButton.addEventListener("click", this.close);

    emailInput.addEventListener("input", this.validateEmail);
    passwordInput.addEventListener("input", this.validatePassword);

    loginButton.addEventListener("click", this.handleLogin);

    document.body.appendChild(this.div);
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  close() {
    this.div.remove();
    const emailInput = this.div.querySelector("#email");
    const passwordInput = this.div.querySelector("#password");
    const closeButton = this.div.querySelector(".login-modal__close-button");
    const button = this.div.querySelector("#login-submit-btn");

    emailInput.removeEventListener("input", this.validateEmail);
    passwordInput.removeEventListener("input", this.validatePassword);

    button.removeEventListener("click", this.handleLogin);
    closeButton.removeEventListener("click", this.close);
  }

  handleClickOutside(event) {
    if (event.target === this.div) {
      this.close();
      document.removeEventListener("mousedown", this.handleClickOutside);
    }
  }

  // todo
  validateEmail() {
    console.log("validateEmail");
  }

  // todo
  validatePassword() {
    console.log("validatePassword");
  }

  handleLogin(event) {
    event.preventDefault();
    const email = this.div.querySelector("#email").value;
    const password = this.div.querySelector("#password").value;
    if (!email || !password) {
      alert("Введіть логін та пароль");
      return;
    }
    fetch("https://ajax.test-danit.com/api/v2/cards/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((response) => {
      if (response.status === 200) {
        localStorage.setItem("token", response.text());
        document.querySelector("#login-button").classList.add("button--hidden");
        document
          .querySelector("#signup-button")
          .classList.add("button--hidden");
        document
          .querySelector("#logout-button")
          .classList.remove("button--hidden");
        document
          .querySelector("#create-visit-button")
          .classList.remove("button--hidden");
        document.querySelector(".main").classList.remove("main--hidden");
        this.close();
        return;
      }
      alert("Невірний логін або пароль");
    });
  }
}

class CreateVisitModal extends Modal {
  constructor() {
    super();
  }

  render() {
    super.render();
    this.div.querySelector(".login-modal__title").textContent =
      "Записати на прийом";
  }
}
