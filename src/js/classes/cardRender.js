const isIncludes = (text, search) => {
  return text.toLowerCase().includes(search.toLowerCase());
}

class CardRender extends Card {
  cards = [];
  filteredCards = [];

  renderCards(cards) {
    document.getElementById("card-wrapper").innerHTML = "";
    cards.forEach(card => {
      this.renderSingleCard(card);
    });
  }

  async getAllCards() {
    this.cards = await this.getCardsData();
    this.renderCards(this.cards);
  }

  filterCards(filters) {
    this.filteredCards = this.cards
      .filter(card => {
        return isIncludes(card.fullName, filters?.search) || isIncludes(card.descriptionVisit, filters?.search);
      })
      .filter(card => {
        return !filters.status || card.status === filters.status
      })
      .filter(card => {
        return !filters.urgency || card.priority === filters.urgency
      });

    this.renderCards(this.filteredCards);
  }

  resetFilters() {
    this.filteredCards = this.cards;
    this.renderCards(this.filteredCards);
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
          <p>Візит до ${card.doctor}а<p>
          <div class="showcard__button-group">
            <button id = "update-button-${card.id}" class="extend-button button button--green">Редагувати</button>
            <button id = "extend-button-${card.id}" class="extend-button button button--green">Показати більше</button>
          </div>
        </div>
        `

    document.getElementById("card-wrapper").appendChild(cardBlock);
    document.getElementById(`close-button-${card.id}`).addEventListener('click', () => {
      this.deleteCardById(card.id).then(() => {
        this.getAllCards()
      });
    })

    const extendButton = document.getElementById(`extend-button-${card.id}`);
    extendButton.addEventListener('click', () => {
      extendedDiv.classList.toggle('hide');

      if (extendButton.innerText === 'Показати більше') {
        extendButton.innerText = 'Приховати';
      } else {
        extendButton.innerText = 'Показати більше';
      }
    });

    const updateButton = document.getElementById(`update-button-${card.id}`);
    updateButton.addEventListener('click', () => {

      let updatedVisit;

      const { doctor } = card;
      if (doctor === "Кардіолог") {
        updatedVisit = new VisitCardiologist("Кардіолог", card);
      } else if (doctor === "Стоматолог") {
        updatedVisit = new VisitDentist("Стоматолог", card);
      } else if (doctor === "Терапевт") {
        updatedVisit = new VisitTherapist("Терапевт", card);
      }

      const modal = new ModalWindow('', 'Редагувати візит', 'Зберегти', () => {
        const updateData = updatedVisit.getValues();

        if (!updateData) {
          return
        }

        this.updateCardById(card.id, updateData)
          .then(response => response.json())
          // .then(response => console.log(response))
          .finally(() => {
            this.getAllCards();
            modal.close();
          })
      });

      modal.render();
      modal.modalContentBody.innerHTML = '';

      updatedVisit.render(".modal-select__body");
    });

    const extendedContent = this.extendedCard(card);
    const extendedDiv = document.createElement('div');
    extendedDiv.classList.add('hide');
    extendedDiv.innerHTML = extendedContent;
    cardBlock.appendChild(extendedDiv);

  }

  extendedCard(card) {
    let newHtml;
    switch (card.doctor) {
      case 'Кардіолог':
        newHtml = `<div class="showcard__expanded">
                      <p>Терміновість: ${card.priority}<p>
                      <p>Статус візиту: ${card.status}<p>
                      <p>Мета візиту: ${card.purpose}<p>
                      <p>Короткий опис візиту: ${card.descriptionVisit}<p>
                      <p>Вік: ${card.age}<p>
                      <p>Тиск: ${card.pressure}<p>
                      <p>Індекс маси тіла: ${card.weight}<p>  
                      <p>Анамнез: ${card.diseases}<p>                      
                </div>
                `;
        break;
      case 'Стоматолог':
        newHtml = ` <div class="showcard__expanded">
                        <p>Терміновість: ${card.priority}<p>
                        <p>Статус візиту: ${card.status}<p>
                        <p>Мета візиту: ${card.purpose}<p>
                        <p>Короткий опис візиту: ${card.descriptionVisit}<p>
                        <p>Дата останнього візиту: ${card.date}<p>
                    </div>
                `;
        break;
      case 'Терапевт':
        newHtml = ` <div class="showcard__expanded">
                      <p>Терміновість: ${card.priority}<p>
                      <p>Статус візиту: ${card.status}<p>
                      <p>Мета візиту: ${card.purpose}<p>
                      <p>Короткий опис візиту: ${card.descriptionVisit}<p>
                      <p>Вік: ${card.age}<p>
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
    await card.getAllCards();
  })();
}