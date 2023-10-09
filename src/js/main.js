class Modal {
  constructor(modalClassName) {
    this.modal = document.querySelector(`.${modalClassName}`);
    this.closeBtn = this.modal.querySelector(".login-modal__close-button");
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

    window.addEventListener("click", (event) => {
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
