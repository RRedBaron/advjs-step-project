class Modal {
  constructor(modalClassName) {
    this.modal = document.querySelector(`.${modalClassName}`);
    this.closeBtn = this.modal.querySelector(".login-modal__close-button");
    this.submitBtn = this.modal.querySelector("#login-sumbit-btn");
    console.log(this.submitBtn);
  }

  open() {
    this.modal.style.display = "flex";
  }

  close() {
    this.modal.style.display = "none";
  }

  init() {
    document.getElementById("login-button").addEventListener("click", () => {
      this.open();
    });

    this.closeBtn.addEventListener("click", () => {
      this.close();
    });

    this.submitBtn.addEventListener("click", (event) => {
      event.preventDefault();
      const email = this.modal.querySelector("#email").value;
      const password = this.modal.querySelector("#password").value;

      fetch("https://ajax.test-danit.com/api/v2/cards/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }).then((response) => {
        if (response.status === 200) {
          this.close();
          document.getElementById("login-button").style.display = "none";
          document.getElementById("signup-button").style.display = "none";
          document.getElementById("logout-button").style.display = "block";
          document.getElementById("create-visit-button").style.display =
            "block";
          document.querySelector(".main").classList.remove("main--hidden");
        } else {
          alert("Wrong email or password");
        }
      });
    });
    window.addEventListener("mousedown", (event) => {
      if (event.target === this.modal) {
        this.close();
      }
    });
  }
}

document.querySelector("#signup-button").addEventListener("click", () => {
  window.location.href =
    "https://ajax.test-danit.com/front-pages/cards-register.html";
});

const modal = new Modal("login-modal");
modal.init();
