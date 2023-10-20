class VisitTherapist extends Visit {
	constructor (doctor) {
        super(doctor);
        this.inputAge = null;
    }

    createElements () {
        super.createElements();
    
        this.form.insertAdjacentHTML('beforeend', `
			<input type="number" name="age" id="age" class="modal-form__age" placeholder="Вік *" required>
		`);                
    }

    //<input type="number" name="age" id="age" class="modal-form__age" placeholder="Вік" required>


    validate() {
        this.inputAge = this.form.querySelector('.modal-form__age');
        if (this.inputAge.value > 110) {
            this.inputAge.classList.add('empty');
            this.inputAge.value = "";
            this.inputAge.placeholder = "Значення не може перевищувати 110"
            return true
        }
    }

    getValues () {
        const body = super.getValues();
        if (this.validate(body)) {
            return false
        } else {
            return body;
        }
    }
}
