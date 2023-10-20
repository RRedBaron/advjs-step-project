class Visit extends Form {
    constructor (doctor) {
        super();
        this.doctor = doctor;
        this.selectPriority = document.createElement('select');
        this.selectStatus = document.createElement('select');
        this.warning = document.createElement('p');
    }

    createElements () {
        super.createElements();
        this.form.className = 'modal__form';
        // this.selectPriority.className = 'select__priority';
        this.selectPriority.className = 'modal-select__select';
		this.selectPriority.id = 'priority';
        // this.selectStatus.className = 'select__status';
        this.selectStatus.className = 'modal-select__select';
		this.selectStatus.id = 'status';

		this.selectPriority.innerHTML = `<option selected value="">Терміновість</option>
			<option value="Звичайна">Звичайна</option>
			<option value="Пріоритетна">Пріоритетна</option>
			<option value="Невідкладна">Невідкладна</option>`;
		this.selectStatus.innerHTML = `<option selected>Cтатуc візиту</option>
			<option value="Запланований">Запланований</option>                   
			<option "Візит відбувся">Візит відбувся</option>`;

        this.warning.innerText = "Увага: форма містить поля обов'язкові для заповнення";
		this.warning.style.color = 'red';
    
        this.form.prepend(this.selectStatus);                
        this.form.append(this.selectPriority);
        this.form.insertAdjacentHTML('beforeend', ` 
        <input type="text" name="fullName" id="fullName" class="modal-select__select" placeholder="ПІБ *" required>
        <input type="text" name="purpose" id="purpose" class="modal-select__select" placeholder="Мета візиту *" required>
        <textarea type="text" name="descriptionVisit" id="descriptionVisit" class="modal-select__select" placeholder="Короткий опис візиту" rows="5"></textarea>`)                   
    }
//в insertAdjacentHTML були класи modal-form__control
    getValues() {    

        const body = super.getValues(); 
        
		const selects = this.form.querySelectorAll('select');
		selects.forEach(({ id, value }) => {
			body[id] = value;
		});

        const {name, value} = this.form.querySelector('textarea');
        body[name] = value;

        body.doctor = this.doctor;

		console.log(body);
        
        if (this.form.querySelector('.empty')) {
            this.form.append(this.warning);
        	return false;
        } else {
            return body;
        }
    }
    
    changeDoctor() {
        this.form.remove();
    }
}