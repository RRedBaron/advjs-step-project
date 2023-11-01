class CardRender extends Card {
    async renderCards() {
        document.getElementById("card-wrapper").innerHTML = "";
        const res = await this.getCardsData();
        res.forEach(card => {
            this.renderSingleCard(card);
        });
    }

    renderSingleCard(card) {

        const cardBlock = document.createElement("div");
        cardBlock.classList.add("card-item");
        cardBlock.innerHTML = `
        <div class="showcard">
          <div class="showcard__header">
           <h2>${card.fullName}</h2>
           <button id="close-button-${card.id}">
                <svg
                    class="cards__close-button"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 27 27"
                    fill="none"
                  >
                 <path
                    d="M26 1L13.5 13.5M1 26L13.5 13.5M13.5 13.5L26 26L1 1"
                    stroke="black"
                    stroke-width="2"
                  />
                </svg>  
            </button> 
        </div>
        <div class="showcard__content">
          <p>${card.doctor}<p>
        <div>
        <button id = "extend-button-${card.id}" class="extend-button button button--green">Показати більше</button>
        <button id = "update-button-${card.id}" class="extend-button button button--green">Редагувати</button>
        <hr />
        </div>
        `
        document.getElementById("card-wrapper").appendChild(cardBlock);
        document.getElementById(`close-button-${card.id}`).addEventListener('click', () => {
            this.deleteCardById(card.id).then(() => {
                this.renderCards()
            });
        })

        const extendButton = document.getElementById(`extend-button-${card.id}`);
        extendButton.addEventListener('click', () => {
            this.extendCard(card, cardBlock);
        });

        //--------
// Кнопка Редагувати. При натисканні на неї замість текстового вмісту картки з'являється форма, де можна відредагувати введені поля. Така ж, як у модальному вікні під час створення картки
        const updateButton = document.getElementById(`update-button-${card.id}`);
        updateButton.addEventListener('click', () => {
            let newData = { //тут треба замість риби викликати модальне вікно з відповідними полями
                // 
                title: 'Визит к кардиологу',
                description: 'Новое описание визита',
                doctor: 'Cardiologist',
                bp: '24',
                age: 23,
                weight: 70
            }
      
            this.updateCardById(card.id, newData)
                .then(response => response.json())
                .then(response => console.log(response))
            // 
        });
        // 
        // далі треба ре-рендер карти з оновленими значеннями?
        // 
    }

    extendCard(card, cardBlock) {
        const extendedContent = this.extendedCard(card);
        const extendedDiv = document.createElement('div');
        extendedDiv.innerHTML = extendedContent;
        cardBlock.appendChild(extendedDiv);
        const extendButton = document.getElementById(`extend-button-${card.id}`);
        extendButton.parentNode.removeChild(extendButton);
    }

    extendedCard(card) {
        let newHtml;
        switch (card.doctor) {
            case 'Кардіолог':
                newHtml = `<div>
                        <p>Вік: ${card.age}<p>
                        <p>Опис: ${card.descriptionVisit}<p>
                        <p>Анамнез: ${card.diseases}<p>
                        <p>Тиск: ${card.pressure}<p>
                        <p>Приоритет: ${card.priority}<p>
                        <p>Ціль візиту: ${card.purpose}<p>
                        <p>Статус візиту: ${card.status}<p>
                        <p>Індекс маси тіла: ${card.weight}<p>
                </div>
                `;
                break;
            case 'Стоматолог':
                newHtml = ` <div>
                        <p>Опис: ${card.descriptionVisit}<p>
                        <p>Приоритет: ${card.priority}<p>
                        <p>Ціль візиту: ${card.purpose}<p>
                        <p>Статус візиту: ${card.status}<p>
                        <p>Дата останнього візиту: ${card.date}<p>
                    </div>
                `;
                break;
            case 'Терапевт':
                newHtml = ` <div>
                    <p>Вік: ${card.age}<p>
                    <p>Опис: ${card.descriptionVisit}<p>
                    <p>Приоритет: ${card.priority}<p>
                    <p>Ціль візиту: ${card.purpose}<p>
                    <p>Статус візиту: ${card.status}<p>
                    <p>Дата останнього візиту: ${card.date}<p>
                </div>
                `;
                break;
        }
        return newHtml;
    }
}

let card;

const token = localStorage.getItem('token');

if (token) {
    card = new CardRender(`https://ajax.test-danit.com/api/v2/cards/`, token);
    (async () => {
        await card.renderCards();
    })();
}