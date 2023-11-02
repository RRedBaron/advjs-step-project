class VisitDentist extends Visit {
	constructor (doctor, card = {}) {
        super(doctor, card);
    }

    createElements () {
        super.createElements();
    
        this.form.insertAdjacentHTML('beforeend', `
			<label for="date" class="modal-form__label">Дата останнього відвідування:</label>
			<input id="date" type="date" name="date" class="modal-form__control modal-select__select" required>
		`);                
    }
}
