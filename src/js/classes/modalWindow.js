class ModalWindow extends Modal {
    constructor(domElement, title, bntText, onConfirmFn) {
        super()
        this.domElement = domElement;
        this.title = title;
        this.bntText = bntText;
        this.onConfirmFn = onConfirmFn;
        this.modalWrapper = document.createElement('div');
        this.modalBackground = document.createElement('div');
        this.modalContent = document.createElement('div');
        this.modalContentHeader = document.createElement('div');
        this.modalContentBody = document.createElement('div');
        this.modalContentFooter = document.createElement('div');
        this.buttonClose = document.createElement('button');
        this.buttonConfirm = document.createElement('button');
    }

    createElement() {
        this.modalWrapper.className = 'modal-select';
        this.modalBackground.className = 'modal-select__background';
        this.modalContent.className = 'modal-select__card ';
        this.modalContentHeader.className = 'modal-select__header';
        this.modalContentBody.className = 'modal-select__body';
        this.modalContentFooter.className = 'modal-select__footer';
        this.buttonClose.className = 'modal-select__btn-close';
        this.buttonConfirm.className = "modal-select__btn-send";

        this.modalContentHeader.innerHTML = `<h1 class="modal-select__header_title">${this.title}</h1>`;
        this.modalContentBody.innerHTML = `<h2 class="modal-select__label">Оберіть лікаря:</h2>`;

        this.buttonConfirm.innerText = this.bntText;
        this.buttonConfirm.type = 'button';

        this.modalContentHeader.append(this.buttonClose);

        //=============S
        // this.buttonClose.innerHTML = ` 
            // <svg
            // class="login-modal__close-button"
            // xmlns="http://www.w3.org/2000/svg"
            // width="27"
            // height="27"
            // viewBox="0 0 27 27"
            // fill="none"
        //   >
            // <path
            //   d="M26 1L13.5 13.5M1 26L13.5 13.5M13.5 13.5L26 26L1 1"
            //   stroke="black"
            //   stroke-width="2"
            // />
        //   </svg>
        // `
        //============S

        this.modalContentBody.append(this.domElement);
        this.modalContentFooter.append(this.buttonConfirm);
        this.modalContent.append(this.modalContentHeader, this.modalContentBody, this.modalContentFooter);
        this.modalWrapper.append(this.modalBackground, this.modalContent);
    }

    addEventListeners() {
        this.buttonClose.addEventListener('click', () => {
            this.close();
        })
        this.modalBackground.addEventListener('click', () => {
            this.close();
        })
        this.buttonConfirm.addEventListener('click', () => {
            this.onConfirmFn(this.close.bind(this));
        })
    }

    close() {
        this.modalWrapper.remove();
    }

    render() {
        this.createElement();
        this.addEventListeners();
        document.body.append(this.modalWrapper);
    }
}
