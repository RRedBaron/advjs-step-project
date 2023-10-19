class VisitCardiologist extends Visit {
	constructor (doctor) {
        super(doctor);
        this.inputAge = null;
        this.inputPress = null;
    }

    createElements () {
        super.createElements();
    
        this.form.insertAdjacentHTML('beforeend', `
			<input type="text" name="pressure" id="pressure" class="form-control pressure" placeholder="Звичайний артеріальний тиск у форматі 70/110" required>
			<input type="number" name="weight" id="weight" class="form-control" placeholder="Індекс маси тіла" required>
			<input type="text" name="diseases" id="diseases" class="form-control" placeholder="Перенесені захворювання серцево-судинної системи" required>
			<input type="number" name="age" id="age" class="form-control age" placeholder="Вік" required>
		`);                
    }
       
    validateAge() {
        this.inputAge = this.form.querySelector('.age');
        if (this.inputAge.value > 110) {
            this.inputAge.classList.add('empty');
            this.inputAge.value = "";
            this.inputAge.placeholder = "Значення не може перевищувати 110"
            return true
        }
    }

    validatePressure () {
        this.inputPress = this.form.querySelector('.pressure');
        let pattern = /(\d+)\/(\d+)/;
        let res = this.inputPress.value.match(pattern);
        if (!(res) || !(res[1] > 40 && res[1] < 160) || !(res[2] > 70 && res[2] < 280)) {
            this.inputPress.classList.add('empty');
            this.inputPress.value = "";
            this.inputPress.placeholder = "Формат запису 70/110 (сиcтолічний 40-160 діастолічний 70-280)"
            return true
        }
    }

    getValues () {
        const body = super.getValues();     
        if (this.validateAge(body) || this.validatePressure(body)) {
            return false
        } else {
            return body;
        }
    }

}
