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
      <div class="login-modal__input-wrapper">
        <p>Email адреса</p>
        <input
          id="email"
          type="text"
          placeholder="example@example.ua"
          required
        />
        <span class="login-form__validation-error" id="email-error"></span>
      </div>
      <div class="login-modal__input-wrapper">
        <p>Пароль</p>
        <input id="password" type="password" placeholder="Пароль" required />
      </div>
      <button type="submit" class="button button--green" id="login-submit-btn">Увійти</button>
      <span class="login-form__validation-error" id="wrong-credentials"></span>
    </form>
    `;

    const emailInput = this.div.querySelector("#email");
    const closeButton = this.div.querySelector(".login-modal__close-button");
    const loginButton = this.div.querySelector("#login-submit-btn");

    closeButton.addEventListener("click", this.close);

    emailInput.addEventListener("input", (event) => {
      this.div.querySelector("#wrong-credentials").textContent = "";
      if (this.validateEmail(event.target.value)) {
        this.div.querySelector("#email-error").textContent = "";
      } else {
        this.div.querySelector("#email-error").textContent =
          "Введіть коректний email";
      }
    });

    loginButton.addEventListener("click", this.handleLogin);

    document.body.appendChild(this.div);
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  close() {
    this.div.remove();
    const closeButton = this.div.querySelector(".login-modal__close-button");
    const button = this.div.querySelector("#login-submit-btn");

    button.removeEventListener("click", this.handleLogin);
    closeButton.removeEventListener("click", this.close);
  }

  handleClickOutside(event) {
    if (event.target === this.div) {
      this.close();
      document.removeEventListener("mousedown", this.handleClickOutside);
    }
  }

  validateEmail(email) {
    const EMAIL_REGEXP =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return EMAIL_REGEXP.test(email);
  }

  handleLogin(event) {
    event.preventDefault();
    const email = this.div.querySelector("#email").value;
    const password = this.div.querySelector("#password").value;

    const emailError = this.div.querySelector("#email-error");
    if (!this.validateEmail(email)) {
      emailError.textContent = "Введіть коректний email";
      return;
    } else {
      emailError.textContent = ""; // Очищаем сообщение об ошибке, если email валидный
    }

    if (!email || !password) {
      this.div.querySelector("#wrong-credentials").textContent =
        "Перевірте введені дані";
      return;
    }
    // fetch("https://ajax.test-danit.com/api/v2/cards/login", {
      // method: "POST",
      // headers: {
        // "Content-Type": "application/json",
      // },
      // body: JSON.stringify({ email, password }),
    // }).then((response) => {
      // if (response.status === 200) {
        // localStorage.setItem("token", response.text());
        // document.querySelector("#login-button").classList.add("button--hidden");
        // document
          // .querySelector("#signup-button")
          // .classList.add("button--hidden");
        // document
          // .querySelector("#logout-button")
          // .classList.remove("button--hidden");
        // document
          // .querySelector("#create-visit-button")
          // .classList.remove("button--hidden");
        // document.querySelector(".main").classList.remove("main--hidden");
        // this.close();
        // return;
      // }
      // this.div.querySelector("#wrong-credentials").textContent =
        // "Невірний логін або пароль";
    // });

    fetch("https://ajax.test-danit.com/api/v2/cards/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password}),
    }).then(response => {
      if (response.status !== 200) {
        this.div.querySelector("#wrong-credentials").textContent =
          "Невірний логін або пароль";
        return;
      }
      return response.text()
    })
      .then((response) => {
        if (response) {
          localStorage.setItem("token", response); // ! 141
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
        }
      });
  }
}
