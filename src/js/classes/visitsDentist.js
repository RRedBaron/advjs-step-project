class VisitDentist extends Visit {
	constructor (doctor) {
        super(doctor);
    }

    createElements () {
        super.createElements();
    
        this.form.insertAdjacentHTML('beforeend', `
			<label for="date" class="modal-form__label">Дата останнього відвідування:</label>
			<input id="date" type="date" name="date" class="modal-form__control" required>
		`);                
    }
}
