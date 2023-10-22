class Form {
	constructor() {
		this.form = null;
	}

	createElements() {
		this.form = document.createElement('form');
	}

	getValues() {
		const inputs = this.form.querySelectorAll('input');

		const body = {};
		inputs.forEach((el) => {
			body[el.name] = el.value;
	
			if (isEmpty(el.value)) {
				el.classList.add('empty')
			} else {
				el.classList.remove('empty')
			}
		})

		return body;
	}

	render(selector = 'body') {
		this.createElements();
		document.querySelector(selector).append(this.form);
	}

	getFormElement() {
		this.createElements();
		return this.form;
	}
}

