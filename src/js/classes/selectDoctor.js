class SelectDoctor extends Form {
    constructor () {
        super();
        this.selectDoctor = document.createElement('select');
    }

    createElements() {
        super.createElements();
		this.form.className = 'modal-select__form';
        this.selectDoctor.className = 'modal-select__select';

        this.selectDoctor.innerHTML = `<option selected>Оберіть лікаря:</option>
							<option value="cardiologist">Кардіолог</option>
							<option value="dentist">Стоматолог</option>
							<option value="therapist">Терапевт</option>`;

        this.form.append(this.selectDoctor);
    }
}
